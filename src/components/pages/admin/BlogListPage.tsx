import { useState, useContext } from "react";
import ActionButton from "../../common/table-action/ActionButton";
import StausBadge from "../../common/table-action/StausBadge";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { axios_get, axios_put, axios_del } from "../../../service/api.service";
import { BLOGS } from "../../../const/tags.const";
import { get } from "lodash";
import { toast } from "react-toastify";

const BlogListPage = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: [BLOGS.LIST],
    queryFn: () => axios_get("/blog/post/list"),
  });

  const colActions = [
    {
      label: "Edit",
      onClick: (data: any) => navigate(`/blog/view/${data.id}`),
    },
    {
      label: "Delete",
      onClick: (data: any) => handleDelete(data),
      colorScheme: "red",
    },
  ];

  const tableData = get(data, "data");
  const [colDefs]: any = useState([
    { field: "title", flex: 1 },
    { field: "teaser", flex: 1 },
    {
      field: "tags",
      flex: 1,
      cellRenderer: (params: any) => {
        const tags = params.value.split(","); // Assuming tags are comma-separated
        return tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-white bg-blue-500 rounded-full mr-1"
          >
            {tag.trim()}
          </span>
        ));
      },
    },
    {
      field: "status",
      flex: 1,
      editable: true,
      cellEditorSelector: () => {
        // Provide a select input for status editing
        return {
          component: "agSelectCellEditor",
          params: {
            values: ["draft", "published", "archived"], // List of status values
          },
        };
      },
      cellRenderer: (params: any) => StausBadge(params.value), // Keep the badge for display
    },
    { field: "updatedAt", flex: 1 },
    {
      headerName: "Actions",
      cellRenderer: ActionButton,
      cellRendererParams: {
        actions: colActions,
      },
      flex: 1,
    },
  ]);

  const handleCellValueChanged = async (event: any) => {
    const { data, colDef, newValue, api, oldValue } = event;

    if (colDef.field === "status" && newValue !== oldValue) {
      console.log("Updating status to:", newValue);

      try {
        await axios_put(`/blog/post/${data.id}`, { status: newValue });
        data.status = newValue;
        api.refreshCells({ rowNodes: [event.node], force: true });
        toast.success(`Status updated for blog post ID: ${data.title}`);
      } catch (error) {
        console.error("Error updating status", error);
        toast.error("Error updating status Try again !");
      }
    }
  };

  const handleDelete = async (data: any) => {
    axios_del(`/blog/post/${data.id}`)
      .then((res) => {
        console.log(res);
        toast.success("Post deleted successfully!");
        navigate("/blog/list");
      })
      .catch((error) => {
        toast.error("Error deleting the post!");
        console.error("Error deleting post:", error.message);
      });
  };

  return (
    <>
      {" "}
      <div className="py-2">
        <h2 className="text-black">Blog List</h2>
      </div>
      <div style={{ width: "100%", height: "50vh" }}>
        <AgGridReact
          pagination={true}
          rowData={tableData}
          columnDefs={colDefs}
          onCellValueChanged={handleCellValueChanged} // Listen to cell value changes
        />
      </div>
    </>
  );
};

export default BlogListPage;