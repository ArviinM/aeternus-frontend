import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import GravePlot from "../../services/graveplot.service";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/primereact.css";

import "./dashboard.scss";

import IGravePlotData from "../../types/graveplot.type";

import { FilterMatchMode } from "primereact";
import { TabTitle } from "../../utils/GenerateFunctions";
import GraveShowerModal from "../map/GraveShowerModal";
import EditFeatureModal from "../map/EditFeatureModal";

interface IFilter {
  global?: any;
  name?: any;
}

const GravePlots: React.FC = () => {
  TabTitle("Aeternus – Grave Plots Table");
  let emptyGravePlot: IGravePlotData = {
    id: "",
    block: { id: "", name: "" },
    lot: "",
    status: "",
    southWest: ["", ""],
    northEast: ["", ""],
    deceased: [
      {
        id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        profile_picture: "",
        birth_date: undefined,
        death_date: undefined,
        obituary: "",
      },
    ],
    lot_owner: {
      id: "63c7afb7fb9fe79294b6288c",
      first_name: "",
      last_name: "",
      username: "",
      address: "",
      contact_no: "",
      email: "",
    },
  };

  const [allGravePlots, setAllGravePlots] = useState<Array<IGravePlotData>>([]);

  const [gravePlot, setGravePlot] = useState<IGravePlotData>(emptyGravePlot);
  const [graveMapDialog, setGraveMapDialog] = useState(false);
  const [gravePlotDialog, setGravePlotDialog] = useState(false);
  const [lotOwnerDialog, setLotOwnerDialog] = useState(false);

  const [deceasedProfileDialog, setDeceasedProfileDialog] = useState(false);

  const [deleteDeceasedDialog, setDeleteDeceasedDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

  const [southWest1, setSouthWest1] = useState<[any]>();
  const [southWest2, setSouthWest2] = useState<[any]>();

  const [northEast1, setNorthEast1] = useState<[any]>();
  const [northEast2, setNorthEast2] = useState<[any]>();

  const [selectedGravePlot, setSelectedGravePlot] = useState<IGravePlotData[]>(
    []
  );
  const [submitted, setSubmitted] = useState(false);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState<IFilter | null>(null);
  const toast = useRef<any>(null);
  const dt = useRef<any>(null);

  const [showGraveMap, setShowGraveMap] = useState(false);
  const [showGraveMap2, setShowGraveMap2] = useState(false);

  const statuses = [
    { name: "Available" },
    { name: "Reserved" },
    { name: "Occupied" },
  ];

  const retrieveAllGravePlots = () => {
    GravePlot.getAll()
      .then((response: any) => {
        setAllGravePlots(response?.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const blocks = [
    { name: "1", id: "63c7ad8efb9fe79294b6287c" },
    { name: "2", id: "63c7ad8efb9fe79294b6287d" },
    { name: "3", id: "63c7ad8efb9fe79294b6287e" },
    { name: "4", id: "63c7ad8efb9fe79294b6287f" },
  ];

  useEffect(() => {
    retrieveAllGravePlots();
    initFilters();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openNew = () => {
    setShowGraveMap(true);
    setGravePlot(emptyGravePlot);
    setSubmitted(false);
    setGravePlotDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setGravePlotDialog(false);
    setGraveMapDialog(false);
    setDeceasedProfileDialog(false);
    setLotOwnerDialog(false);
  };

  const hideDeleteDeceasedDialog = () => {
    setDeleteDeceasedDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveGravePlot = () => {
    setSubmitted(true);
    gravePlot.southWest[0] = southWest1;
    gravePlot.southWest[1] = southWest2;

    gravePlot.northEast[0] = northEast1;
    gravePlot.northEast[1] = northEast2;

    if (gravePlot.lot.trim()) {
      let _graveplot = { ...gravePlot };

      if (_graveplot.id) {
        GravePlot.updateName(_graveplot.id, _graveplot)
          .then((response) => {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Deceased Updated",
              life: 3000,
            });
            retrieveAllGravePlots();
          })
          .catch((e) => {
            console.log(e);
            toast.current.show({
              severity: "error",
              summary: "Error!",
              detail: "There is an error updating the grave plot information.",
              life: 3000,
            });
          });
      } else {
        GravePlot.create(_graveplot)
          .then((response) => {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Grave Plot Created",
              life: 3000,
            });
            retrieveAllGravePlots();
          })
          .catch((e) => {
            console.log(e);
            toast.current.show({
              severity: "error",
              summary: "Error!",
              detail: "There is an error creating the deceased information.",
              life: 3000,
            });
          });
      }

      setGravePlotDialog(false);
      setGravePlot(emptyGravePlot);
    }
  };

  const saveGravePlotLocation = () => {
    setSubmitted(true);
    gravePlot.southWest[0] = southWest1;
    gravePlot.southWest[1] = southWest2;

    gravePlot.northEast[0] = northEast1;
    gravePlot.northEast[1] = northEast2;

    let _graveplot = { ...gravePlot };

    if (_graveplot.id) {
      GravePlot.updateLoc(_graveplot.id, _graveplot)
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Grave Plot Location Updated",
            life: 3000,
          });
          retrieveAllGravePlots();
        })
        .catch((e) => {
          console.log(e);
          toast.current.show({
            severity: "error",
            summary: "Error!",
            detail: "There is an error updating the grave plot information.",
            life: 3000,
          });
        });
    }
    setDeceasedProfileDialog(false);
    setGravePlot(emptyGravePlot);
  };

  const editGravePlotLoc = (gravePlot: IGravePlotData) => {
    setGravePlot({ ...gravePlot });
    setDeceasedProfileDialog(true);
  };

  const editGravePlot = (graveplot: IGravePlotData) => {
    setGravePlot({ ...graveplot });
    setGravePlotDialog(true);
    setShowGraveMap(false);
  };

  const viewGravePlotLocation = (graveplot: IGravePlotData) => {
    setGravePlot({ ...graveplot });
    setGraveMapDialog(true);
  };

  const viewLotOwner = (graveplot: IGravePlotData) => {
    setGravePlot({ ...graveplot });
    setLotOwnerDialog(true);
  };

  const confirmDeleteGravePlot = (graveplot: IGravePlotData) => {
    setGravePlot(graveplot);
    setDeleteDeceasedDialog(true);
  };

  const deceasedDialogProfilePictureFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveGravePlotLocation}
      />
    </>
  );

  const deleteGravePlot = () => {
    let _graveplot = { ...gravePlot };

    if (_graveplot.id) {
      GravePlot.remove(_graveplot.id)
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Grave Plot deleted",
            life: 3000,
          });
          retrieveAllGravePlots();
        })
        .catch((e) => {
          console.log(e);
          toast.current.show({
            severity: "error",
            summary: "Error!",
            detail: "There is an error deleting the grave plot.",
            life: 3000,
          });
        });
    }

    retrieveAllGravePlots();
    setGravePlot(_graveplot);
    setDeleteDeceasedDialog(false);
    setGravePlot(emptyGravePlot);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedGravePlot = () => {
    let index: any[] = [];
    for (let i = 0; i < selectedGravePlot.length; i++) {
      index.push(selectedGravePlot[i].id);
    }

    setDeleteProductsDialog(false);

    if (index) {
      index.forEach((e) => {
        GravePlot.remove(e)
          .then((response) => {
            retrieveAllGravePlots();
          })
          .catch((e) => {
            console.log(e);
            toast.current.show({
              severity: "error",
              summary: "Error!",
              detail: "There is an error deleting the grave plot.",
              life: 3000,
            });
          });
      });

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Grave Plot deleted",
        life: 3000,
      });
    }
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue("");
  };

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const onInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _graveplots = { ...gravePlot };
    // @ts-ignore
    _graveplots[`${name}`] = val;
    setGravePlot(_graveplots);
  };

  const onDropDownChange2 = (e: DropdownChangeParams) => {
    let _graveplot = { ...gravePlot };

    _graveplot.block["name"] = e.value;
    _graveplot.block.id = _graveplot.block.name;
    setGravePlot(_graveplot);
  };

  const onDropDownChange = (e: DropdownChangeParams) => {
    let _graveplot = { ...gravePlot };

    _graveplot.status = e.value;
    setGravePlot(_graveplot);
    console.log(e.value);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={openNew}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={confirmDeleteSelected}
            disabled={!selectedGravePlot || !selectedGravePlot.length}
          />
        </div>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        {/* <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        /> */}
      </React.Fragment>
    );
  };

  const blockTemplate = (rowData: IGravePlotData) => {
    return (
      <>
        <span className="p-column-title">Block</span>
        {rowData.block.name}
      </>
    );
  };

  const lotTemplate = (rowData: IGravePlotData) => {
    return (
      <>
        <span className="p-column-title">Lot</span>
        {rowData.lot}
      </>
    );
  };
  const statusBodyTemplate = (rowData: IGravePlotData) => {
    return (
      <>
        <span className="p-column-title">Status</span>
        <span className="capitalize">{rowData.status}</span>
      </>
    );
  };

  const openMapTemplate = (rowData: IGravePlotData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-map"
          className="p-button-rounded p-button-primary"
          onClick={() => viewGravePlotLocation(rowData)}
          tooltip="Open grave plot location"
        />
      </div>
    );
  };

  const lotOwnerTemplate = (rowData: IGravePlotData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-info"
          className="p-button-rounded p-button-primary"
          onClick={() => viewLotOwner(rowData)}
          tooltip="Open lot owner information"
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData: IGravePlotData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-map"
          className="p-button-rounded p-button-info mr-2"
          onClick={() => editGravePlotLoc(rowData)}
          placeholder="Top"
          tooltip="Edit grave plot location"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editGravePlot(rowData)}
          placeholder="Top"
          tooltip="Edit grave plot information"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteGravePlot(rowData)}
        />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h5 className="m-0">Manage Grave Plots</h5>

        {/* <span className="block mt-2 md:mt-0 p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            value={globalFilterValue}
            onInput={onGlobalFilterChange}
            placeholder="Search..."
          />
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            className="p-button-outlined mx-2"
            onClick={clearFilter}
          />
        </span> */}
      </div>
    );
  };

  const deceasedDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveGravePlot}
      />
    </>
  );

  const deleteDeceasedDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteDeceasedDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteGravePlot}
      />
    </>
  );

  const deleteProductsDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedGravePlot}
      />
    </>
  );

  const header = renderHeader();

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={allGravePlots}
          selection={selectedGravePlot}
          onSelectionChange={(e) => setSelectedGravePlot(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} deceased"
          globalFilter={globalFilterValue}
          header={header}
          responsiveLayout="scroll"
          emptyMessage="No grave plots found 🪦"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          <Column
            field="block"
            header="Block"
            body={blockTemplate}
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="lot"
            header="Lot"
            body={lotTemplate}
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="status"
            filter
            sortable
            header="Status"
            body={statusBodyTemplate}
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="openMap"
            header="Open Lot"
            style={{ minWidth: "5rem" }}
            body={openMapTemplate}
          ></Column>
          <Column
            field="openLotOwner"
            header="Open Lot Owner"
            style={{ minWidth: "2rem" }}
            body={lotOwnerTemplate}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={gravePlotDialog}
        style={{ width: "450px" }}
        header="Grave Plot Details"
        modal
        maximizable
        className="p-fluid"
        footer={deceasedDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label>Grave Block</label>
          <Dropdown
            optionValue={"id"}
            value={gravePlot.block.name}
            options={blocks}
            onChange={onDropDownChange2}
            placeholder="Select a Grave Plot"
            optionLabel={"name"}
          />
        </div>
        <div className="field col">
          <label htmlFor="name">Grave Lot</label>
          <InputText
            id="Lot"
            value={gravePlot.lot}
            onChange={(e) => onInputChange(e, "lot")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !gravePlot.lot,
            })}
          />
          {submitted && !gravePlot.lot && (
            <small className="p-error">Lot Address is required.</small>
          )}
        </div>
        <div className="field col">
          <label htmlFor="name">Status</label>
          <Dropdown
            optionValue="name"
            value={gravePlot.status}
            options={statuses}
            onChange={onDropDownChange}
            placeholder="Select Status"
            optionLabel="name"
          />
        </div>

        {showGraveMap && (
          <div className="field col">
            <label htmlFor="name">Plot the Grave</label>
            <EditFeatureModal
              southWest={[setSouthWest1, setSouthWest2]}
              northEast={[setNorthEast1, setNorthEast2]}
            />
          </div>
        )}
      </Dialog>

      <Dialog
        visible={deceasedProfileDialog}
        style={{ width: "450px" }}
        header="Edit Grave Plot Location"
        modal
        maximizable
        className="p-fluid"
        footer={deceasedDialogProfilePictureFooter}
        onHide={hideDialog}
      >
        <EditFeatureModal
          southWest={[setSouthWest1, setSouthWest2]}
          northEast={[setNorthEast1, setNorthEast2]}
        />
      </Dialog>

      <Dialog
        visible={lotOwnerDialog}
        style={{ width: "600px" }}
        header="Lot Owner Details"
        modal
        maximizable
        className="p-fluid"
        onHide={hideDialog}
      >
        <p className="whitespace-pre-line">
          <span className="font-bold">Owner:</span>{" "}
          {gravePlot.lot_owner.first_name} {gravePlot.lot_owner.last_name}
        </p>
        <p className="whitespace-pre-line">
          <span className="font-bold">Username:</span>{" "}
          {gravePlot.lot_owner.username}
        </p>
        <p className="whitespace-pre-line">
          <span className="font-bold">Contact Number:</span>{" "}
          {gravePlot.lot_owner.contact_no}
        </p>
        <p className="whitespace-pre-line">
          <span className="font-bold">Email:</span> {gravePlot.lot_owner.email}
        </p>
        <p className="whitespace-pre-line">
          <span className="font-bold">Address:</span>{" "}
          {gravePlot.lot_owner.address}
        </p>
      </Dialog>

      <Dialog
        visible={deleteDeceasedDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteDeceasedDialogFooter}
        onHide={hideDeleteDeceasedDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {gravePlot && (
            <span>
              Are you sure you want to delete{" "}
              <b>
                B{gravePlot.block.name} L{gravePlot.lot}
              </b>
              ?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={graveMapDialog}
        style={{ width: "600px" }}
        header="Grave Map"
        modal
        maximizable
        className="p-fluid"
        onHide={hideDialog}
      >
        <GraveShowerModal
          southWest={gravePlot.southWest}
          northEast={gravePlot.northEast}
          blockName={gravePlot.block.name}
          lotName={gravePlot.lot}
          availability={gravePlot.status}
        />
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {gravePlot && (
            <span>
              Are you sure you want to delete the selected grave plot?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default GravePlots;
