const reRender = async (component, domElement, id = "") => {
    document.querySelector(domElement).innerHTML = await component.print(id);
    if (component.afterRender) component.afterRender();
};

export default reRender;