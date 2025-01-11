import React, { useEffect } from "react";
import * as Yup from "yup";
import FormInput from "../../common/form-components/FormInput";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { axios_get, axios_put } from "../../../service/api.service";
import { getErrorMessage } from "../../../utils";
import { toast } from "react-toastify";
import FormTextArea from "../../common/form-components/FormTextArea";
import { BLOG } from "../../../const/methods.conts";
import { BLOGS } from "../../../const/tags.const";
import { get } from "lodash";

const BlogViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const METHOD_URL = BLOG.VIEW + id;
  const { data, isLoading } = useQuery({
    queryKey: [BLOGS.LIST],
    queryFn: () => axios_get(METHOD_URL),
  });

  const articleMutation = useMutation(
    (data) => {
      return axios_put(`blog/post/${id}`, data);
    },
    {
      onSuccess: () => {
        toast.success("Aritcle Updated!");
        navigate("/blog/list");
      },
      onError: (error: any) => {
        const message = getErrorMessage(error);
        toast.error(message || "An error occurred");
      },
    }
  );

  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      slug: Yup.string().required("Slug is required"),
      cover_img: Yup.string().required("Image is required"),
      content: Yup.string().required("Content is required"),
      teaser: Yup.string().required("Teaser is required"),
    }),
    onSubmit: (values: any) => {
      articleMutation.mutate(values);
    },
  });

  useEffect(() => {
    if (id) {
      const values = get(data, "data.post", {});
      formik.setValues(values);
    }
  }, [id, JSON.stringify(data)]);

  return (
    <>
      <div className="py-2">
        <h2 className="text-black">View Blog Articel</h2>
      </div>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        {/* Title Input */}
        <FormInput
          name="title"
          type="text"
          label="Title"
          placeholder="Enter Blog Title ex : example blog!"
          formik={formik}
          isRequired={true}
        />
        <FormInput
          name="slug"
          type="text"
          label="Slug"
          placeholder="exsample-blog"
          formik={formik}
          isRequired={true}
        />

        <FormInput
          name="category"
          type="text"
          label="Category"
          placeholder="Categories , use ',' comma sparate after each category"
          formik={formik}
          isRequired={false}
        />
        <FormInput
          name="tags"
          type="text"
          label="Tags"
          placeholder="Tags , use ',' comma sparate after each tags"
          formik={formik}
          isRequired={false}
        />

        <FormInput
          name="cover_img"
          type="url"
          label="Cover Image"
          placeholder="ex : https://blog.com/image"
          formik={formik}
          isRequired={true}
        />

        <FormTextArea
          label="Blog Teaser"
          name="teaser"
          formik={formik}
          isRequired
          placeholder="Write your blog Teaser here"
          rows={3}
        />
        <FormTextArea
          label="Blog content"
          name="content"
          formik={formik}
          isRequired
          placeholder="Write your blog content here"
          rows={6}
        />

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={() => {
              formik.handleSubmit();
            }}
            className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Update Blog
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogViewPage;
