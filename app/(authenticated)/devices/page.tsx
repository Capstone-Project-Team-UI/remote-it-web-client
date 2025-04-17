"use client";
import CustomFooter from "@/components/footer";
import CustomHeader from "@/components/header";
import { Table, Search, TableColumns, TableData, SortTypes, TableSortBy, TableRowConfig, Button, Tag, Toggle, IconPerson } from "@veneer/core";
import { useState, ChangeEvent, MouseEvent, useEffect } from "react";

export default function Login() {
  interface UserDBData {
    serialNumber: string;
    emailAddress: string;
    userID: string;
    organization: string;
    uniqueID: string;
  }

  interface UserData extends UserDBData {
    setupStatus: boolean;
    connectionStatus: boolean;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [dbData, setDBData] = useState<UserDBData[] | null>(null);
  const [userData, setUserData] = useState<UserData[] | null>(null);
  const [tableData, setTableData] = useState<TableData[] | null>(null);

  const [order, setOrder] = useState(["serialNumber", "emailAddress", "setupStatus", "connectionStatus"]);
  const [orderBy, setOrderBy] = useState("serialNumber");
  const [orderType, setOrderType] = useState<SortTypes>("ascending");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [serialNumSearch, setSerialNumSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [setupStatusToggle, setSetupStatusToggle] = useState(false);
  const [connectionStatusToggle, setConnectionStatusToggle] = useState(false);

  // DATA
  // #region
  useEffect(() => {
    const fetchedUsers = async () => {
      try {
        const data = await fetch("http://localhost:8090/users");
        const dataJson: UserDBData[] = await data.json();

        // UPAL
        // NOTE: The check status request is made automatically for each fetched user.
        const users: UserData[] = await Promise.all(
          dataJson.map(async (user) => {
            let connectionStatus: boolean = false;

            // NOTE: These are the values that are passed into the check status request as query params.
            const hostParam = "";
            const userParam = "";
            const passwordParam = "";

            try {
              // NOTE: The API docs says that 'api' is included here and that the name of the endpoint is 'check_status', alter as necessary.
              const checkStatusRes = await fetch(
                `http://localhost:8080/api/local/check_status?host=${hostParam}&user=${userParam}&password=${passwordParam}`,
                {
                  method: "GET",
                }
              );

              // If status check is successful, set the connection status for this entry to be true.
              connectionStatus = checkStatusRes.ok;
            } catch (err) {
              console.error(err);
            }

            return { ...user, setupStatus: true, connectionStatus: connectionStatus ?? false };
          })
        );

        // NOTE: Not sure what params you need passed into this function, I put serialNumber here for now. Lmk if you need anything else.
        // line 109 is where this function is called for params to be passed, and you can access/add any variables under 'UserData' (line 16)
        // on line 100.
        const onStartKVM = async (serialNumber: string) => {
          try {
            // NOTE: The API docs says that 'api' is included here, remove it if that changed.
            const res = await fetch("http://localhost:8080/api/local/start_kvm", {
              method: "POST",
              // NOTE: Body is blank
              body: JSON.stringify({
                host: "",
                user: "",
                password: "",
              }),
            });

            if (!res.ok) return;

            // TODO: Do somewith with response, depending on the form of data that is returned if any (JSON, text, etc.)
          } catch (err) {
            console.error(err);
          }
        };

        const userTableData: TableData[] = users.map(({ serialNumber, emailAddress, setupStatus, connectionStatus }) => {
          return {
            serialNumber,
            emailAddress,
            setupStatus: <Tag label={setupStatus ? "Registered" : "Not Registered"} colorScheme={setupStatus ? "green" : "gray"} />,
            connectionStatus: <Tag label={connectionStatus ? "Connected" : "Offline"} colorScheme={connectionStatus ? "green" : "gray"} />,
            rowConfig: { rowSelector: { icon: <IconPerson /> }, selected: false },
            // NOTE: The start kvm request is made whenever the "Connect" button is clicked.
            // NOTE: This is where the function that makes the 'start_kvm' endpoint request is called.
            connect: <Button onClick={() => onStartKVM(serialNumber)}>Connect</Button>,
          };
        });

        setDBData(dbData);
        setUserData(users);
        setTableData(userTableData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchedUsers();
  }, []);
  // #endregion

  // FILTERED DATA
  // #region
  const filterSort = (
    data: TableData[] | null,
    filters: { serialNumber: string; emailAddress: string; setupStatus: boolean; connectionStatus: boolean },
    orderBy: string,
    orderType: string
  ) => {
    return data
      ?.filter((item) => !filters.serialNumber || (item?.serialNumber as string)?.toLowerCase().includes(filters.serialNumber.toLowerCase()))
      .filter((item) => !filters.emailAddress || (item?.emailAddress as string)?.toLowerCase().includes(filters.emailAddress.toLowerCase()))
      .filter((item) => !filters.setupStatus || userData?.find((curData) => curData.serialNumber === item.serialNumber)?.setupStatus)
      .filter((item) => !filters.connectionStatus || userData?.find((curData) => curData.serialNumber === item.serialNumber)?.connectionStatus)
      .sort((a, b) => {
        if (orderType === "ascending") return (a[orderBy] ?? 1) > (b[orderBy] ?? 1) ? 1 : -1;
        else return (a[orderBy] ?? 1) < (b[orderBy] ?? 1) ? 1 : -1;
      });
  };

  const filteredData = filterSort(
    tableData,
    {
      serialNumber: serialNumSearch,
      emailAddress: emailSearch,
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
      id: "serialNumber",
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
      id: "emailAddress",
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
  const pagedData: TableData[] | undefined = filteredData?.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  const paginationProps = {
    currentPage,
    onPageChange: handlePageChange,
    pageSize,
    totalItems: filteredData?.length ?? 0,
  };
  // #endregion

  // SELECTION
  // #region
  const handleSelect = (event: ChangeEvent<HTMLInputElement>, index: string | number) => {
    return tableData != null
      ? setTableData(
          tableData.map((item) =>
            (item?.serialNumber as string) === index ? { ...item, rowConfig: { ...item.rowConfig, selected: event.target.checked } } : item
          )
        )
      : null;
  };
  const numSelectedItems = tableData != null ? tableData.filter((t) => (t?.rowConfig as TableRowConfig).selected === true).length : 0;
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
      <CustomHeader page="devices" />
      {/* BODY */}
      <div className="flex items-center justify-center h-full bg-[#d3d3d3]">
        <div className="flex flex-col items-start justify-center gap-y-4 max-w-screen-xl h-full py-6">
          {/* TITLE */}
          <h1 className="text-3xl text-[#212121] font-bold">KVM Devices</h1>
          {/* TABLE */}
          <Table
            columns={columns}
            data={pagedData ?? []}
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
            rowAvatar={false}
            rowSelector="avatar"
            showFilters={true}
            loading={isLoading}
            className="h-full"
          />
        </div>
      </div>
      {/* FOOTER */}
      <CustomFooter />
    </div>
  );
}
