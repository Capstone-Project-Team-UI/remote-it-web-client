"use client";
import CustomFooter from "@/components/footer";
import CustomHeader from "@/components/header";
import { Table, Search, TableColumns, TableData, SortTypes, TableSortBy, TableRowConfig, Button, Tag, Toggle } from "@veneer/core";
import { useState, ChangeEvent, MouseEvent } from "react";
import Link from "next/link";

export default function Login() {
  const [order, setOrder] = useState(["serialNum", "email", "setupStatus", "connectionStatus"]);
  const [orderBy, setOrderBy] = useState("serialNum");
  const [orderType, setOrderType] = useState<SortTypes>("ascending");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const [serialNumSearch, setSerialNumSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [setupStatusToggle, setSetupStatusToggle] = useState(false);
  const [connectionStatusToggle, setConnectionStatusToggle] = useState(false);

  // DATA
  // #region
  const dbData = [
    {
      serialNum: "1234",
      email: "arthur123@hp.com",
      name: {
        firstName: "Arthur",
        lastName: "Moore",
      },
      setupStatus: true,
      connectionStatus: false,
    },
    {
      serialNum: "12345",
      email: "beatriz456@hp.com",
      name: {
        firstName: "Beatriz",
        lastName: "Crowley",
      },
      setupStatus: false,
      connectionStatus: false,
    },
    {
      serialNum: "123456",
      email: "carlos111@hp.com",
      name: {
        firstName: "Carlos",
        lastName: "Benz",
      },
      setupStatus: true,
      connectionStatus: true,
    },
  ];

  const data: TableData[] = dbData.map(({ serialNum, email, name, setupStatus, connectionStatus }) => {
    return {
      serialNum,
      email,
      setupStatus: <Tag label={setupStatus ? "Connected" : "Offline"} colorScheme={setupStatus ? "green" : "gray"} />,
      connectionStatus: <Tag label={connectionStatus ? "Connected" : "Offline"} colorScheme={connectionStatus ? "green" : "gray"} />,
      rowConfig: { rowSelector: { label: `${name.firstName[0]}${name.lastName[0]}`.toUpperCase() }, selected: false },
      connect: (
        <Link href={`/kvm?serialNum=${serialNum}`}>
          <Button>Connect</Button>
        </Link>
      ),
    };
  });

  const [tableData, setTableData] = useState(data);
  // #endregion

  // FILTERED DATA
  // #region
  const filterSort = (
    data: TableData[],
    filters: { serialNum: string; email: string; setupStatus: boolean; connectionStatus: boolean },
    orderBy: string,
    orderType: string
  ) => {
    return data
      .filter((item) => !filters.serialNum || (item?.serialNum as string)?.toLowerCase().includes(filters.serialNum.toLowerCase()))
      .filter((item) => !filters.email || (item?.email as string)?.toLowerCase().includes(filters.email.toLowerCase()))
      .filter((item) => !filters.setupStatus || dbData.find((curData) => curData.serialNum === item.serialNum)?.setupStatus)
      .filter((item) => !filters.connectionStatus || dbData.find((curData) => curData.serialNum === item.serialNum)?.connectionStatus)
      .sort((a, b) => {
        if (orderType === "ascending") return (a[orderBy] ?? 1) > (b[orderBy] ?? 1) ? 1 : -1;
        else return (a[orderBy] ?? 1) < (b[orderBy] ?? 1) ? 1 : -1;
      });
  };

  const filteredData = filterSort(
    tableData,
    {
      serialNum: serialNumSearch,
      email: emailSearch,
      setupStatus: setupStatusToggle,
      connectionStatus: connectionStatusToggle,
    },
    orderBy,
    orderType
  );
  // #endregion

  // TABLE COLUMNS
  // #region
  const columns: TableColumns[] = [
    {
      id: "serialNum",
      label: "Serial Number",
      index: "visible",
      filter: (
        <Search
          label="Search"
          placeholder="Placeholder"
          id="table-filter-SerialNumber"
          value={serialNumSearch}
          onClear={() => setSerialNumSearch("")}
          onChange={(value) => setSerialNumSearch(value ?? "")}
        />
      ),
    },
    {
      id: "email",
      label: "Email",
      filter: (
        <Search
          label="Search"
          placeholder="Placeholder"
          id="table-filter-Email"
          value={emailSearch}
          onClear={() => setEmailSearch("")}
          onChange={(value) => setEmailSearch(value ?? "")}
        />
      ),
    },
    {
      id: "setupStatus",
      label: "Setup Status",
      filter: <Toggle label="" id="setupStatus" name="setupStatus" onChange={(value) => setSetupStatusToggle(value ?? false)} />,
      sortable: false,
    },
    {
      id: "connectionStatus",
      label: "Connection Status",
      filter: <Toggle label="" id="connectionStatus" name="connectionStatus" onChange={(value) => setConnectionStatusToggle(value ?? false)} />,
      sortable: false,
    },
    {
      id: "connect",
      label: "",
    },
  ];
  // #endregion

  // PAGINATION
  // #region
  const pagedData: TableData[] = filteredData.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  const paginationProps = {
    currentPage,
    onPageChange: handlePageChange,
    pageSize,
    totalItems: filteredData.length,
  };
  // #endregion

  // SELECTION
  // #region
  const handleSelect = (event: ChangeEvent<HTMLInputElement>, index: string | number) => {
    return setTableData(
      tableData.map((item) =>
        (item?.serialNum as string) === index ? { ...item, rowConfig: { ...item.rowConfig, selected: event.target.checked } } : item
      )
    );
  };
  const numSelectedItems = tableData.filter((t) => (t?.rowConfig as TableRowConfig).selected === true).length;
  // #endregion

  // SORTING
  // #region
  const handleSort = (_: MouseEvent<HTMLButtonElement>, { id, type }: TableSortBy) => {
    setOrderBy(id);
    setOrderType(type);
  };
  // #endregion

  return (
    <div className="flex flex-col h-screen overflow-hidden xl:mx-auto">
      {/* HEADER */}
      <CustomHeader user="user" page="devices" />
      {/* BODY */}
      <div className="flex items-center justify-center h-full bg-[#d3d3d3]">
        <div className="flex flex-col items-start justify-center gap-y-4 max-w-screen-xl h-full py-6">
          {/* TITLE */}
          <h1 className="text-3xl text-[#212121] font-bold">KVM Devices</h1>
          {/* TABLE */}
          <Table
            columns={columns}
            data={pagedData}
            loadingDataLength={5}
            onSelect={handleSelect}
            onSort={handleSort}
            preferences={{
              defaultOrder: order,
              sortBy: { id: orderBy, type: orderType },
              width: [{ columnId: "connect", width: 136 }],
            }}
            numberOfSelectedItems={numSelectedItems > 0 ? numSelectedItems : undefined}
            pagination={paginationProps}
            rowAvatar={true}
            rowSelector="avatar"
            showFilters={true}
            className="h-full"
          />
        </div>
      </div>
      {/* FOOTER */}
      <CustomFooter />
    </div>
  );
}
