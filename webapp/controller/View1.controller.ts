import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import SearchField from "sap/m/SearchField";
import Table from "sap/m/Table";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import Event from "sap/ui/base/Event";
import ColumnListItem from "sap/m/ColumnListItem";
import UIComponent from "sap/ui/core/UIComponent";
// My first UI5 controller
/**
 * @namespace helloui5.controller
 */
export default class View1 extends Controller {

    public onInit(): void {

        // Create data - like filling internal table
        // const orderData = {
        //     orderNumber: "45000012345",
        //     customer: "1000456",
        //     status: "Open",
        //     netValue: 12500,
        //     currency: "USD",
        //     editable: false
        // };

        // Create JSON Model - like ABAP memory
        // const model = new JSONModel(orderData);

        const ordersData = {
            orders: [
                {
                    orderNumber: "4500012345",
                customer: "1000456",
                status: "Open",
                netValue: 12500,
                currency: "USD"
            },
            {
                orderNumber: "4500012346",
                customer: "1000789",
                status: "In Process",
                netValue: 8420,
                currency: "USD"
            },
            {
                orderNumber: "4500012347",
                customer: "1000234",
                status: "Open",
                netValue: 15890,
                currency: "EUR"
            },
            {
                orderNumber: "4500012348",
                customer: "1000678",
                status: "Completed",
                netValue: 3920,
                currency: "USD"
            },
            {
                orderNumber: "4500012349",
                customer: "1000451",
                status: "Open",
                netValue: 21950,
                currency: "EUR"
            },
            {
                orderNumber: "4500012350",
                customer: "1000678",
                status: "Cancelled",
                netValue: 14562,
                currency: "EUR"
            },
        ]
        };

        // Create Model
        const model = new JSONModel(ordersData);

        // Set model on the view - make it available to xml
        this.getView()?.setModel(model);

    }

    onButtonPress(): void {
        // alert("Button pressed!");
        MessageToast.show("Button pressed successfully!");
    }

    onEditPress(): void {
        const model = this.getView()?.getModel() as JSONModel;
        const editable = model.getProperty("/editable");
        model.setProperty("/editable", !editable);

        MessageToast.show(editable ? "Display Mode" : "Edit Mode");
    }

    // FUNCTION for TABLE ON SEARCH
    onSearch(event: Event): void {

        // get search value
        const query = (event.getSource() as SearchField).getValue();

        // get table binding
        const table = this.byId("ordersTable") as Table;
        const binding = table.getBinding("items") as ListBinding;

        // create filter
        // const filters = query ? [new Filter("customer", FilterOperator.Contains, query)] : [];

        // binding.filter(filters);

        if (query) {
            // Multiple filter - search across all fields
            const filters = [
                new Filter({
                    filters: [
                        new Filter("orderNumber", FilterOperator.Contains, query),
                        new Filter("customer", FilterOperator.Contains, query),
                        new Filter("status", FilterOperator.Contains, query),
                        new Filter("currency", FilterOperator.Contains, query)
                    ],
                    and: false
                })
            ];
            binding.filter(filters);
        } else {
            binding.filter([]);
        }

    }

    // ===========================
    // SALES ORDER TABLE ROW PRESS
    //============================
    onRowPress(event: Event): void {
    //     const row = (event as any).getParameter("listItem") as ColumnListItem;
    //     const ctx = row.getBindingContext();
    //     const path = ctx?.getPath();
    //     // const orderNumber = ctx?.getProperty("orderNumber");

    //     const router = (this.getOwnerComponent() as UIComponent).getRouter();
    //     // router.navTo("RouteView2", { orderNumber: orderNumber });
    //     router.navTo("RouteView2", {paht: encodeURIComponent(path!) });

    
        const row = (event as any).getParameter("listItem") as ColumnListItem;
        const ctx = row.getBindingContext();
        const order = ctx?.getObject();  // gets entire row object!

        // store in component model
        const component = this.getOwnerComponent() as UIComponent;
        component.setModel(new JSONModel(order), "selectedOrder");

        component.getRouter().navTo("RouteView2");

    }

}