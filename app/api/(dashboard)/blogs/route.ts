import connect from "@/lib/db";
import User from "@/lib/models/user";
import Categroies from "@/lib/models/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Blog from "@/lib/models/blog";
import Category from "@/lib/models/category";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    // Search functionality (To find keywords in the title of the blogs)
    const searchkeywords = searchParams.get("keywords") as string;

    // Filtering based on start and end date
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Sorting blogs based on createAt
    const asc = searchParams.has("asc");
    const desc = searchParams.has("desc");

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        {
          status: 400,
        }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing categoryId" }),
        {
          status: 400,
        }
      );
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const category = await Categroies.findOne({
      _id: categoryId,
      user: new Types.ObjectId(userId),
    });

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        {
          status: 404,
        }
      );
    }

    // Fetch all blogs for a given user and category from the database and return them as JSON.
    const filter: any = {
      user: new Types.ObjectId(userId),
      category: new Types.ObjectId(categoryId),
    };

    // If searchKeywords is present search for them in Blogs
    if (searchkeywords) {
      filter.$or = [
        {
          title: { $regex: searchkeywords, $options: "i" },
        },
        {
          description: { $regex: searchkeywords, $options: "i" },
        },
      ];
    }

    // Based on start and end date
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
      };
    } else if (endDate) {
      filter.createdAt = {
        $lte: new Date(endDate),
      };
    }

    const skip = (page - 1) * limit;

    // Sorting based on asc and desc
    const blogs = desc
      ? await Blog.find(filter).sort({ createdAt: "desc" })
      : await Blog.find(filter).sort({ createdAt: "asc" });

    return new NextResponse(JSON.stringify(blogs), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");
    const { title, description } = await req.json();

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing categoryId" }),
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 400,
      });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        {
          status: 400,
        }
      );
    }

    const newBlog = new Blog({
      title,
      description,
      user: new Types.ObjectId(userId),
      category: new Types.ObjectId(categoryId),
    });

    await newBlog.save();

    return new NextResponse(JSON.stringify({ message: "Blog is created" }), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "Error creating a blog " + error.message }),
      { status: 500 }
    );
  }
};
