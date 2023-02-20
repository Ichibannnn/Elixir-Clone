import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

//Component Main Container
import MainContainer from "./components/MainContainer";
import UomManagement from "./pages/setup/UomManagement";
import LotManagement from "./pages/setup/LotManagement";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ErrorPage from "./pages/ErrorPage";
import Login from "./components/Login";
import MaterialsManagement from "./pages/setup/MaterialsManagement";
import CustomersManagement from "./pages/setup/CustomersManagement";
import SuppliersManagement from "./pages/setup/SuppliersManagement";
import ItemCategory from "./pages/setup/ItemCategory";
import { Context } from "./components/context/Context";

//LANDING PAGE
import UserManagementPage from "./UserManagementPage";
import SetupManagementPage from "./SetupManagementPage";
import LotCategory from "./pages/setup/LotCategory";
import CustomerType from "./pages/setup/CustomerType";
import ReasonManagement from "./pages/setup/ReasonManagement";
import CompanyManagement from "./pages/account_title/CompanyManagement";

import UserAccount from "./pages/user_management/UserAccount";
import UserRole from "./pages/user_management/UserRole";
import ModuleManagement from "./pages/user_management/ModuleManagement";
import MenuManagement from "./pages/user_management/MenuManagement";

// Account Title
import AccTDepartment from "./pages/setup/AccTDepartment";
import AccTLocation from "./pages/setup/AccTLocation";
import AccTAccount from "./pages/setup/AccTAccount";
import ImportPage from "./ImportPage";
import ImportPO from "./pages/import/ImportPO";
import ReceivingModule from "./ReceivingModule";
import WarehouseReceiving from "./pages/receiving/WarehouseReceiving";
import CancelledPO from "./pages/receiving/CancelledPO";
import ReceivedMaterials from "./pages/receiving/ReceivedMaterials";
import ApprovalRejectMaterials from "./pages/receiving/ApprovalRejectMaterials";
import WarehouseConfirmReject from "./pages/receiving/WarehouseConfirmReject";
import ItemSubCategory from "./pages/setup/ItemSubCategory";
import OrderingPage from "./OrderingPage";
import Orders from "./pages/ordering/orders/Orders";
import ImportOrder from "./pages/import/import_orders/ImportOrder";
import PreparationSchedule from "./pages/ordering/preparation_schedule/PreparationSchedule";
import ApprovalPage from "./pages/ordering/approval/ApprovalPage";
import CalendarPage from "./pages/ordering/calendar/CalendarPage";
import InventoryPage from "./InventoryPage";
import MoveOrder from "./pages/inventory/MoveOrder";

const App = () => {
  const [menu, setMenu] = useState(null);

  return (
    <Context.Provider value={{ menu, setMenu }}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<MainContainer />}>
            {/* SETUP */}
            <Route path="/setup" element={<SetupManagementPage />}>
              <Route path="/setup/uom-management" element={<UomManagement />} />
              <Route
                path="/setup/materials-management"
                element={<MaterialsManagement />}
              />
              <Route path="/setup/item-category" element={<ItemCategory />} />
              <Route
                path="/setup/item-subcategory"
                element={<ItemSubCategory />}
              />
              <Route
                path="/setup/suppliers"
                element={<SuppliersManagement />}
              />
              <Route
                path="/setup/customers-management"
                element={<CustomersManagement />}
              />
              <Route path="/setup/customer-type" element={<CustomerType />} />
              <Route path="/setup/lot-management" element={<LotManagement />} />
              <Route path="/setup/lot-category" element={<LotCategory />} />
              <Route
                path="/setup/reason-management"
                element={<ReasonManagement />}
              />
              <Route
                path="/setup/account_title-company"
                element={<CompanyManagement />}
              />
              <Route
                path="/setup/account_title-department"
                element={<AccTDepartment />}
              />
              <Route
                path="/setup/account_title-location"
                element={<AccTLocation />}
              />
              <Route
                path="/setup/account_title-account"
                element={<AccTAccount />}
              />
            </Route>

            {/* USER */}
            <Route path="/user" element={<UserManagementPage />}>
              <Route path="/user/user-account" element={<UserAccount />} />
              <Route path="/user/user-role" element={<UserRole />} />
              <Route
                path="/user/module-management"
                element={<ModuleManagement />}
              />
              <Route
                path="/user/menu-management"
                element={<MenuManagement />}
              />
            </Route>

            {/* IMPORT */}
            <Route path="/import" element={<ImportPage />}>
              <Route path="/import/import-po" element={<ImportPO />} />
              <Route path="/import/import-order" element={<ImportOrder />} />
            </Route>

            {/* RECEIVING */}
            <Route path="/receiving" element={<ReceivingModule />}>
              <Route
                path="/receiving/warehouse-receiving"
                element={<WarehouseReceiving />}
              />
              <Route path="/receiving/cancelled-po" element={<CancelledPO />} />
              <Route
                path="/receiving/received-materials"
                element={<ReceivedMaterials />}
              />
              <Route
                path="/receiving/approval-rejectmaterials"
                element={<ApprovalRejectMaterials />}
              />
              <Route
                path="/receiving/warehouse-confirmreject"
                element={<WarehouseConfirmReject />}
              />
            </Route>

            {/* ORDERING */}
            <Route path="/ordering" element={<OrderingPage />}>
              <Route path="/ordering/orders" element={<Orders />} />
              <Route
                path="/ordering/preparation"
                element={<PreparationSchedule />}
              />{" "}
              <Route path="/ordering/approval" element={<ApprovalPage />} />
              <Route path="/ordering/calendar" element={<CalendarPage />} />
            </Route>

            {/* INVENTORY */}
            <Route path="/inventory" element={<InventoryPage />}>
              <Route path="/inventory/move-order" element={<MoveOrder />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Route>
      </Routes>
    </Context.Provider>
  );
};

export default App;
