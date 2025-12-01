export type ModalLayoutProperties = {
    // Styles
    size?: "small" | "medium" | "large" | "extralarge" | "fullscreen"; // Modal size
    title: string; // Modal title
    buttonLabel: string; // Button label
    // States
    hideModal: (visibility: boolean) => void; // Change Modal visibility
    isDataFetched?: boolean; // Data is fetched or not
    disableButton?: boolean; // Disable button or not
    hideButton?: boolean; // Hide button or not
    errorText?: string; // Error text
    loadingText?: string; // Loading text
    showErrorText: boolean; // Show error text or not
    submitButtonFunction?: () => void; // Submit button function
    submitFunction: () => Promise<boolean>; // Submit function
    resetOnError?: boolean; // Reset on error
    onClose?: () => void; // On close function
    // Children
    children?: React.ReactNode; // Modal content
};

export type BaseModalProperties = {
    visible: boolean; // Modal visibility
    changeVisibility: (visibility: boolean) => void; // Change Modal visibility
};

export type ModalProperties<T, A = undefined> = {
    visible: boolean; // Modal visibility
    changeVisibility: (visibility: boolean) => void; // Change Modal visibility
    selectedItem?: T; // Selected item
    items: T[]; // Items to be displayed
    setItems: (items: T[]) => void; // Set items,
    utilArray1?: A[]; // Utility array 1
};
