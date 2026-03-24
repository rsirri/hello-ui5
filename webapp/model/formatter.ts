export default {

    statusState(status: string): string {
        switch(status) {
            case "Open":       return "Information";
            case "In Process": return "Warning";
            case "Completed":  return "Success";
            case "Cancelled":  return "Error";
            default:           return "None";
        }
    },

    valueState(value: number): string {
        if (value > 15000) return "Error";
        if (value > 8000)  return "Warning";
        return "Success";
    }

}