import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace helloui5.controller
 */
export default class View1 extends Controller {

    public onInit(): void {

        // Create data - like filling internal table
        const orderData = {
            orderNumber: "45000012345",
            customer: "1000456",
            status: "Open",
            netValue: 12500,
            currency: "USD",
            editable: false
        };

        // Create JSON Model - like ABAP memory
        const model = new JSONModel(orderData);

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

}