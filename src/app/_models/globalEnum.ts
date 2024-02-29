export enum LeadStatus {
    FollowUp = 'F',
    Close = 'C',
    Deactive = 'D',
    Pending = 'A'
}

export enum LeadVendorPaymentStatus {
    Paid = 'P',
    NotPaid = 'N'
}

export enum withdrawRequestPaymentMode {
    PAYTM = 'GTGC0084',
    UPI = 'GTGC0085',
    BANKACCOUNT = 'GTGC0086'
}

export enum MessageType {
    None = 0,
    Information = 1,
    Error = 2,
    Warning = 3,
    Alert = 4

}

export enum ToastCode {
    None = 0,
    Information = "ATMCMN-01_INFO-M",
    Error = "ATMCMN-04_ERROR-M",
    Warning = "ATMCMN-03_WARN-M",
    Alert = "ATMCMN-02_ALERT-M"

}