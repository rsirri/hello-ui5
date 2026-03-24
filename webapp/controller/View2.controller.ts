import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";

export default class View2 extends Controller {

    // ==========================
    // INITIALIZE FUNCTION
    // ==========================
    onInit(): void {
        const router = (this.getOwnerComponent() as UIComponent).getRouter();
        router.getRoute("RouteView2")?.attachPatternMatched(this.onRouteMatched, this);
    }

    onRouteMatched(): void {
        // const orderNumber = event.getParameter("arguments").orderNumber;
        // const orderNumber = event.getParameter("arguments").path;
        
        // // For now — load mock data based on orderNumber
        // // const orderData = {
        // //     orderNumber: orderNumber,
        // //     customer: "1000456",
        // //     status: "Open",
        // //     netValue: 12500,
        // //     currency: "USD"
        // // };

        // // const model = new JSONModel(orderData);
        // // this.getView()?.setModel(model);

        // const model = (this.getOwnerComponent() as UIComponent).getModel() as JSONModel;
        // this.getView()?.setModel(model);
        // this.getView()?.bindObject({ path: path });

        const component = this.getOwnerComponent() as UIComponent;
        const model = component.getModel("selectedOrder") as JSONModel;
        this.getView()?.setModel(model);

    }

    onNavBack(): void {
        const router = (this.getOwnerComponent() as UIComponent).getRouter();
        router.navTo("RouteView1");
    }

}