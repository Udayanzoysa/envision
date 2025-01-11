import { useState } from "react";
import ActionButton from "../../common/table-action/ActionButton";
import StausBadge from "../../common/table-action/StausBadge";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { axios_get } from "../../../service/api.service";
import { BLOGS } from "../../../const/tags.const";
import { get } from "lodash";

const BlogListPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
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
      onClick: (data: any) => navigate(`/blog/delete/${data.id}`),
      colorScheme: "red",
    },
  ];

  const tableData = get(data, "data");
  console.log(tableData);
  const [colDefs, setColDefs]: any = useState([
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
      cellRenderer: (params: any) => StausBadge(params.value),
    },
    { field: "createdAt", flex: 1 },
    {
      headerName: "Actions",
      cellRenderer: ActionButton,
      cellRendererParams: {
        actions: colActions,
      },
      flex: 1,
    },
  ]);

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
        />
      </div>
    </>
  );
};

export default BlogListPage;
