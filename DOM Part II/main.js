// Generates a new random id
// Used when creating a new item
let genId = () => {
    return "" + Math.floor(Math.random() * 1000000000)
}

// The current screen viewed by the user
// Certain button presses changes this variable
// It is used in the render function to determine what to display to the user
let currentView = "items-for-sale"

// Corresponds to the id of the item in the item details view
let detailItemId = undefined

// Stores all the items that all for sale. 
// The key of the map is the item id
let itemsForSale = new Map()

// This parameter is used to show the img when adding the item image url
let addItemImgURL = undefined;
// There parameters are used to temp store the content of add or modified
let tempTitle = "";
let tempPrice = "";
let tempDesc = "";

// Some hard coded data
itemsForSale.set("xyz", {
    itemId: "xyz",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Panton_Stuhl.jpg/255px-Panton_Stuhl.jpg",
    title: "chair",
    price: "15",
    description: "Our lounge chairs are manufactured with our 13 years of experience to ensure our quality and your peace of mind."
})

itemsForSale.set("desk", {
    itemId: "desk",
    imageURL: "https://www.ikea.com/us/en/images/products/alex-desk-white__0735966_PE740300_S5.JPG?f=s",
    title: "desk",
    price: "50",
    description: ""
})

itemsForSale.set("bed", {
    itemId: "bed",
    imageURL: "https://cdn.shopify.com/s/files/1/2660/5106/products/kfw9qjviqef2xq4vksun_9c18a67d-7ba3-430f-b665-9f3776d43eef_1400x.jpg?v=1571710450",
    title: "bed",
    price: "200",
    description: ""
})

// Items in Cart
let itemsInCart = new Map();

// update item amount in cart flag
let cartQtyUpdatingFlag = new Map();

// Items bought in history
let historyRecord = [];

// Returns a DOM node for displaying an item
let itemForSaleToElem = item => {
    // For debugging purposes
    console.log("creating DOM node for", item);

    // This DOM node will contain the image of the item
    let imageContainer = document.createElement("div");
    let imageElem = document.createElement("img");
    imageElem.setAttribute("src", item.imageURL);
    imageElem.setAttribute("class", "short-image hover-pointer");
    imageElem.addEventListener("click", () => {
        currentView = "item-detail";
        detailItemId = item.itemId;
        render();
    });
    imageContainer.setAttribute("class", "imageContainerSize")
    imageContainer.appendChild(imageElem);

    // Clicking this button will show the details page for the item
    let detailsButton = document.createElement("button");
    detailsButton.innerText = "Get item details";
    detailsButton.setAttribute("class", "yellowButton homeButton");
    detailsButton.addEventListener("click", () => {
        currentView = "item-detail"
        detailItemId = item.itemId
        render()
    })

    // Clicking this button will delete the item
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete this item";
    deleteButton.setAttribute("class", "homeButton");
    deleteButton.addEventListener("click", ()=>{
        itemsForSale.delete(item.itemId);
        render();
    });

    let itemTitle = document.createElement("div");
    itemTitle.innerText = item.title;
    itemTitle.setAttribute("class", "homeTitle hover-pointer textLinkHover");
    itemTitle.addEventListener("click", () => {
        currentView = "item-detail";
        detailItemId = item.itemId;
        render();
    });

    let itemPrice = document.createElement("div");
    itemPrice.innerHTML = "<span class='homePriceLabel'>CDN$</span>" + parseFloat(item.price).toFixed(2).toString();
    itemPrice.setAttribute("class", "homePrice");

    let itemDesc = document.createElement("div");
    itemDesc.innerText = item.description;
    itemDesc.setAttribute("class", "homeDesc");

    let container = document.createElement("div")
    container.appendChild(imageContainer)
    container.appendChild(itemTitle)
    container.appendChild(itemPrice)
    container.appendChild(itemDesc)
    container.appendChild(detailsButton)
    container.appendChild(deleteButton)
    container.setAttribute("class", "item-for-sale")

    return container;
}

// Returns a DOM node for displaying all items
let allItemsView = () => {
    console.log("all items view")

    // itemIds will contain an array that contains all the item ids
    let itemIds = Array.from(itemsForSale.keys())
    let container = document.createElement("div")
    // Iterate through all the item ids one by one
    for (let i = 0; i < itemIds.length; i++) {
        let id = itemIds[i]
        let item = itemsForSale.get(id)
        console.log("item", item)
        // itemForSaleToElem returns a DOM node representing the element
        let itemElem = itemForSaleToElem(item)
        container.appendChild(itemElem)
    };
    return container;
}

// When the user clicks the "add item" button
let addItemView = () => {
    // For debugging purposes
    console.log("add item view")
    let contents = document.createElement("div");

    // This DOM node will contain the image of the item
    let container = document.createElement("div")
    container.setAttribute("class", "item-add-or-modification");
    
    // show the details of items
    
    // title
    let itemTitle = document.createElement("div");
    itemTitle.innerText = "Title";
    itemTitle.setAttribute("class", "add-or-modification-title add-or-modification-one-line-input");
    let itemTitleInput = document.createElement("input");
    itemTitle.appendChild(itemTitleInput);
    itemTitleInput.setAttribute("type", "text");
    itemTitleInput.value = tempTitle;
    itemTitleInput.addEventListener("blur", ()=>{
        if(itemTitleInput.value == ""){
           itemTitleInput.setAttribute("style", "border-color: red");
        } else {
            itemTitleInput.removeAttribute("style");
        }
    });

    // price
    let itemPrice = document.createElement("div");
    itemPrice.innerText = "Price(CDN$)";
    itemPrice.setAttribute("class", "add-or-modification-price add-or-modification-one-line-input");
    let itemPriceInput = document.createElement("input");
    itemPrice.appendChild(itemPriceInput);
    itemPriceInput.setAttribute("type", "text");
    itemPriceInput.value = tempPrice;    
    itemPriceInput.addEventListener("blur", ()=>{
        if(itemPriceInput.value == ""){
            itemPriceInput.setAttribute("style", "border-color: red");
        } else {
            itemPriceInput.removeAttribute("style");
        }
    });

    // description
    let itemDesc = document.createElement("div");
    itemDesc.innerText = "Description";
    itemDesc.setAttribute("class", "add-or-modification-description .add-or-modification-one-line-input");
    let itemDescInput = document.createElement("textarea");
    itemDescInput.value = tempDesc; 

    // image
    let itemImgContainer = document.createElement("div");
    itemImgContainer.setAttribute("class", "add-or-modification-img-container");
    let itemImg = document.createElement("img");
    itemImg.setAttribute("class", "short-image add-or-modification-img");
    itemImgContainer.appendChild(itemImg);

    // image URL
    let itemImageURL = document.createElement("div");
    itemImageURL.innerText = "Image URL:";
    itemImageURL.setAttribute("class", "add-or-modification-one-line-input add-or-modification-img-url");
    let itemImageURLInput = document.createElement("input");
    itemImageURL.appendChild(itemImageURLInput);
    itemImageURLInput.setAttribute("type", "text");
    if(addItemImgURL !== undefined) {
        itemImg.setAttribute("src", addItemImgURL);
        itemImageURLInput.value = addItemImgURL;
        itemTitleInput.value = tempTitle;
        itemPriceInput.value = tempPrice;
        itemDescInput.value = tempDesc;
        addItemImgURL = undefined;
        tempTitle = "";
        tempPrice = "";
        tempDesc = "";
    }
    itemImageURLInput.addEventListener("blur", ()=>{
        addItemImgURL = itemImageURLInput.value;
        tempTitle = itemTitleInput.value;
        tempPrice = itemPriceInput.value;
        tempDesc = itemDescInput.value;
        // itemImg.setAttribute("src", addItemImgURL);
        currentView = "add-item";
        render();
    });
    // itemImageURLInput.value = itemsForSale.get(detailItemId).imageURL;

    let submitButton = document.createElement("button")
    submitButton.innerText = "Add item";
    submitButton.setAttribute("class", "add-or-modification-submit");
    submitButton.addEventListener("click", () => {

        if(itemTitleInput.value !="" && itemPriceInput.value!=""){
            let newItemId = genId()
            let newItem = {
                itemId: newItemId,
                imageURL: itemImageURLInput.value,
                title: itemTitleInput.value,
                price: parseFloat(itemPriceInput.value).toFixed(2).toString(),
                description: itemDescInput.value
            }
            itemsForSale.set(newItemId, newItem)
            currentView = "items-for-sale"
            console.log(itemsForSale);
            render()
        }
        if(itemTitleInput.value == ""){
            itemTitleInput.setAttribute("style", "border-color: red");
        }
        if(itemPriceInput.value == ""){
            itemPriceInput.setAttribute("style", "border-color: red");
        }
    });
    
    container.appendChild(itemImgContainer);
    container.appendChild(itemImageURL);
    container.appendChild(itemTitle);
    container.appendChild(itemPrice);
    container.appendChild(itemDesc);
    container.appendChild(itemDescInput);
    container.appendChild(submitButton);
    contents.appendChild(container);
    return contents;
}

// When you ask for the details for an item, this is what gets displayed
let itemDetailView = () => {
    console.log("item detail view")
    let contents = document.createElement("div")
    // This DOM node will contain the image of the item
    let container = document.createElement("div")
    // show the details of items
    // image
    let itemImgContainer = document.createElement("div");
    itemImgContainer.setAttribute("class", "detail-image-container");
    let itemImg = document.createElement("img");
    itemImg.setAttribute("src", itemsForSale.get(detailItemId).imageURL);
    itemImg.setAttribute("class", "short-image detail-image");
    itemImgContainer.appendChild(itemImg);
    // title
    let itemTitle = document.createElement("div");
    itemTitle.innerText = itemsForSale.get(detailItemId).title;
    itemTitle.setAttribute("class", "detail-title");
    // price
    let itemPrice = document.createElement("div");
    // itemPrice.innerText = itemsForSale.get(detailItemId).price
    let tempPrice = itemsForSale.get(detailItemId).price;
    itemPrice.innerHTML = '<span class="detail-label">Price: </span> CDN$ ' + parseFloat(tempPrice).toFixed(2).toString();
    itemPrice.setAttribute("class", "detail-price");
    // description
    let itemDesc = document.createElement("div");
    itemDesc.innerText = itemsForSale.get(detailItemId).description
    itemDesc.setAttribute("class", "detail-description");

    // add to cart function
    let addToCart = document.createElement("button");    
    addToCart.innerHTML = "<span>Add to Cart<span>";
    addToCart.setAttribute("class", "fas fa-cart-plus yellowButton detail-addtocart");
    addToCart.addEventListener("click", () =>{
        if(itemsInCart.has(detailItemId)){
            // the selected item has been added in cart
            itemsInCart.set(detailItemId, {
                itemId: detailItemId,
                itemTitle: itemTitle.innerText,
                itemImageURL: itemsForSale.get(detailItemId).imageURL,
                itemPrice: tempPrice,
                itemDesc: itemDesc.innerText,
                itemAmount: parseInt(itemsInCart.get(detailItemId).itemAmount) + 1,
                
            });
        } else {
            // selected item 
            itemsInCart.set(detailItemId, {
                itemId: detailItemId,
                itemTitle: itemTitle.innerText,
                itemImageURL: itemsForSale.get(detailItemId).imageURL,
                itemPrice: tempPrice,   // exact number of price, like 10, 20, 30 without '$'
                itemDesc: itemDesc.innerText,
                itemAmount: 1
            });
        }
        render();
    });

    // quantity of item in cart
    let itemQtyInCart = document.createElement('div');
    itemQtyInCart.setAttribute("class", "qty-in-cart");
    let qtyInCart = itemsInCart.get(detailItemId);
    console.log(qtyInCart);
    itemQtyInCart.innerText = qtyInCart==undefined||qtyInCart.itemAmount==0?"":"+ "+qtyInCart.itemAmount;


    // modify item details button
    let modifyDetails = document.createElement("button");
    modifyDetails.innerText = "modify item details";
    modifyDetails.setAttribute("class", "detail-modify");
    modifyDetails.addEventListener("click", ()=>{
        currentView = "modify-item-detail"
        detailItemId = detailItemId;
        render();
    });

    container.appendChild(itemImgContainer);
    container.appendChild(itemTitle);
    container.appendChild(itemPrice);
    container.appendChild(itemDesc);
    container.appendChild(addToCart);
    container.appendChild(modifyDetails);
    container.appendChild(itemQtyInCart);
    // container.setAttribute("class", "item-for-sale");
    container.setAttribute("class", "item-details");
    // return container;
    contents.appendChild(container);
    return contents
}

let modifyDetailsView = () =>{

    console.log("item detail view")
    let contents = document.createElement("div");

    // This DOM node will contain the image of the item
    let container = document.createElement("div")
    container.setAttribute("class", "item-add-or-modification");
    
    // title
    let itemTitle = document.createElement("div");
    itemTitle.innerText = "Title";
    itemTitle.setAttribute("class", "add-or-modification-title add-or-modification-one-line-input");
    let itemTitleInput = document.createElement("input");
    itemTitle.appendChild(itemTitleInput);
    itemTitleInput.setAttribute("type", "text");
    itemTitleInput.value = itemsForSale.get(detailItemId).title;
    itemTitleInput.addEventListener("blur", ()=>{
        if(itemTitleInput.value == ""){
           itemTitleInput.setAttribute("style", "border-color: red");
        } else {
            itemTitleInput.removeAttribute("style");
        }
    });

    // price
    let itemPrice = document.createElement("div");
    itemPrice.innerText = "Price(CDN$)";
    itemPrice.setAttribute("class", "add-or-modification-price add-or-modification-one-line-input");
    let itemPriceInput = document.createElement("input");
    itemPrice.appendChild(itemPriceInput);
    itemPriceInput.setAttribute("type", "text");
    itemPriceInput.value = itemsForSale.get(detailItemId).price;
    itemPriceInput.addEventListener("blur", ()=>{
        if(itemPriceInput.value == ""){
            itemPriceInput.setAttribute("style", "border-color: red");
        } else {
            itemPriceInput.removeAttribute("style");
        }
    });

    // description
    let itemDesc = document.createElement("div");
    itemDesc.innerText = "Description";
    itemDesc.setAttribute("class", "add-or-modification-description .add-or-modification-one-line-input");
    let itemDescInput = document.createElement("textarea");
    itemDescInput.value = itemsForSale.get(detailItemId).description;
        
    // show the details of items
    // image
    let itemImgContainer = document.createElement("div");
    itemImgContainer.setAttribute("class", "add-or-modification-img-container");
    let itemImg = document.createElement("img");
    itemImg.setAttribute("class", "short-image add-or-modification-img");
    itemImgContainer.appendChild(itemImg);
    
    // image URL
    let itemImageURL = document.createElement("div");
    itemImageURL.innerText = "Image URL:";
    itemImageURL.setAttribute("class", "add-or-modification-one-line-input add-or-modification-img-url");
    let itemImageURLInput = document.createElement("input");
    itemImageURL.appendChild(itemImageURLInput);
    if(addItemImgURL !== undefined) {
        itemImg.setAttribute("src", addItemImgURL);
        itemsForSale.get(detailItemId).imageURL = addItemImgURL;
        itemImg.setAttribute("src", addItemImgURL);
        itemImageURLInput.value = addItemImgURL;
        itemTitleInput.value = tempTitle;
        itemPriceInput.value = tempPrice;
        itemDescInput.value = tempDesc;
        addItemImgURL = undefined;
        tempTitle = "";
        tempPrice = "";
        tempDesc = "";
    } else {
        itemImg.setAttribute("src", itemsForSale.get(detailItemId).imageURL);
    }
    itemImageURLInput.setAttribute("type", "text");
    itemImageURLInput.value = itemsForSale.get(detailItemId).imageURL;
    itemImageURLInput.addEventListener("blur", ()=>{
        addItemImgURL = itemImageURLInput.value;
        tempTitle = itemTitleInput.value;
        tempPrice = itemPriceInput.value;
        tempDesc = itemDescInput.value;
        currentView = "modify-item-detail";
        render();
    });

    let submitButton = document.createElement("button")
    submitButton.innerText = "Submit";
    submitButton.setAttribute("class", "add-or-modification-submit");
    submitButton.addEventListener("click", () => {

        if(itemTitleInput.value!="" && itemPriceInput.value!=""){
            itemsForSale.get(detailItemId).title = itemTitleInput.value;
            itemsForSale.get(detailItemId).imageURL = itemImageURLInput.value;
            itemsForSale.get(detailItemId).price = parseFloat(itemPriceInput.value).toFixed(2).toString();
            itemsForSale.get(detailItemId).description = itemDescInput.value;

            itemsInCart.get(detailItemId).itemTitle = itemTitleInput.value;
            itemsInCart.get(detailItemId).itemImageURL = itemImageURLInput.value;
            itemsInCart.get(detailItemId).itemPrice = parseFloat(itemPriceInput.value).toFixed(2).toString();
            itemsInCart.get(detailItemId).itemDesc = itemDescInput.value;

            currentView = "items-for-sale"
            console.log(itemsForSale);
            render()
        }

        if(itemTitleInput.value == ""){
            itemTitleInput.setAttribute("style", "border-color: red");
        }
        if(itemPriceInput.value == ""){
            itemPriceInput.setAttribute("style", "border-color: red");
        }
    });

    container.appendChild(itemImgContainer);
    container.appendChild(itemImageURL);
    container.appendChild(itemTitle);
    container.appendChild(itemPrice);
    container.appendChild(itemDesc);
    container.appendChild(itemDescInput);
    container.appendChild(submitButton);
    contents.appendChild(container);

    return contents;
};

// When click the "cart" button, the cart page will be shown
let cartView = () =>{
    console.log("cart view");
    let container = document.createElement("div");
    // container.innerText = "this is cart";

    document.body.setAttribute("class", "greyBody");

    let cart = document.createElement("div");
    cart.setAttribute("class", "cart");
    container.appendChild(cart);

    let cartHeader = document.createElement("div");
    cartHeader.setAttribute("class", "cart-header");
    cart.appendChild(cartHeader);

    if(itemsInCart.size === 0) {
        cartHeader.innerText = "Your shopping cart is empty.";
        return container;
    }
    
    cartHeader.innerText = "Shopping Cart"
    let cartHeaderPriceLabel = document.createElement("div");
    cartHeaderPriceLabel.setAttribute("id", "cartPriceLabel")
    cartHeaderPriceLabel.innerText = "Price";
    cartHeader.appendChild(cartHeaderPriceLabel);
    

    // let totalPriceAmount = 0.00;
    let totalPrice = 0.00;
    let totalAmount = 0;

    let cartBody = document.createElement("div");
    cartBody.setAttribute("class", "cart-body");
    cart.appendChild(cartBody);

    itemsInCart.forEach((v, k)=>{
        let cartEachItemContainer = document.createElement("div");
        cartEachItemContainer.setAttribute("class", "cart-item-container");
        let cartItemImg = document.createElement("img");
        cartItemImg.setAttribute("src", v.itemImageURL);
        cartItemImg.setAttribute("class", "cart-img hover-pointer");
        cartEachItemContainer.appendChild(cartItemImg);
        cartItemImg.addEventListener("click", ()=>{
            currentView = "item-detail";
            detailItemId = k;
            render();
        });

        let cartItemTitle = document.createElement("div");
        cartItemTitle.innerText = v.itemTitle;
        cartItemTitle.setAttribute("class", "cart-title hover-pointer");
        cartEachItemContainer.appendChild(cartItemTitle);
        cartItemTitle.addEventListener("click", ()=>{
            currentView = "item-detail";
            detailItemId = k;
            render();
        });

        let cartItemDesc = document.createElement("div");
        cartItemDesc.innerText = v.itemDesc;
        cartItemDesc.setAttribute("class", "cart-description");
        cartEachItemContainer.appendChild(cartItemDesc);

        // create the container include qty and delete button
        let cartItemQtyDelContainer = document.createElement('div');
        cartItemQtyDelContainer.setAttribute("class", "cart-qty-del-container");


        let cartItemDelete = document.createElement("div");
        cartItemDelete.innerText = "Delete";
        cartItemDelete.setAttribute("class", "cart-delete hover-pointer");
        cartItemDelete.addEventListener("click", ()=>{
            itemsInCart.delete(k);
            render();
        });
        
        // show the qty of item in cart by either button or input text field
        if (cartQtyUpdatingFlag.get(k)!=undefined && cartQtyUpdatingFlag.get(k).flag){
            let cartItemQtyInput = document.createElement("input");
            cartItemQtyInput.setAttribute("type", "text");
            cartItemQtyInput.value = cartQtyUpdatingFlag.get(k).amount;
            cartItemQtyInput.addEventListener("blur", ()=>{
                cartQtyUpdatingFlag.get(k).amount = cartItemQtyInput.value;
            });

            // update button
            let updateQtyButton = document.createElement("button");
            updateQtyButton.innerText = "update";
            updateQtyButton.setAttribute("class", "yellowButton cart-qty-update-button");
            updateQtyButton.addEventListener("click", ()=>{
                cartQtyUpdatingFlag.set(k).flag = false;
                if(cartItemQtyInput.value != ""){
                    itemsInCart.get(k).itemAmount = cartItemQtyInput.value;
                }
                currentView = "cart";
                render();
            });

            console.log(document.querySelector(".cart-delete"));
            cartItemQtyDelContainer.appendChild(cartItemQtyInput);
            cartItemDelete.setAttribute("style", "padding-left: 10px");
            cartItemQtyDelContainer.appendChild(updateQtyButton);
        } else {
            let cartItemQty = document.createElement("button");
            cartItemQty.innerText = "Qty: " + v.itemAmount;
            cartItemQty.setAttribute("class", "cart-qty-shown");
            cartItemQtyDelContainer.appendChild(cartItemQty);  
            cartItemQty.addEventListener("click", ()=>{
                // console.log("click the qty")
                cartQtyUpdatingFlag.set(k, {"flag":true, "amount": v.itemAmount.toString()});
                render();
            });
        }
        
        cartItemQtyDelContainer.appendChild(cartItemDelete);
        cartEachItemContainer.appendChild(cartItemQtyDelContainer);

        let cartItemPrice = document.createElement("div");
        cartItemPrice.innerText = "CDN$ " + parseFloat(v.itemPrice).toFixed(2).toString();
        cartItemPrice.setAttribute("class", "cart-price");
        cartEachItemContainer.appendChild(cartItemPrice);

        totalPrice += (parseInt(v.itemAmount) * parseFloat(v.itemPrice));
        totalAmount += parseInt(v.itemAmount);

        cartBody.appendChild(cartEachItemContainer);
    });

    let totalPriceContainer = document.createElement("div");
    totalPriceContainer.setAttribute("class", "cart-total-price");
    totalPriceContainer.innerHTML = "Total (" + totalAmount + " items): <span>CDN$ " + totalPrice.toFixed(2) + "</span>";
    cart.appendChild(totalPriceContainer);

    //purchase button
    let purchaseButton = document.createElement("button");
    purchaseButton.innerText = "Proceed to Checkout";
    purchaseButton.setAttribute("class", "yellowButton proceed-checkout-btn")
    purchaseButton.addEventListener("click", ()=>{
        let purchaseRecord = new Map();
        purchaseRecord.set("orderTime", (new Date()).toLocaleString());
        purchaseRecord.set("totalPriceAmount", totalPrice);
        let purchaseItems = new Map();
        itemsInCart.forEach((v,k)=>{
        purchaseItems.set(k, v);
    });
    purchaseRecord.set("purchaseItems", purchaseItems);

    historyRecord.push(purchaseRecord);
    itemsInCart.clear();
    render();
    });
    // container.appendChild(document.createElement("div"));
    cart.appendChild(purchaseButton);
    return container;
};

let historyView = () =>{
    console.log("history view");
    let container = document.createElement("div");

    let historyHeader = document.createElement("div");
    historyHeader.setAttribute("class", "history-header");
    container.appendChild(historyHeader);

    if(historyRecord.length === 0) {
        // container.innerText = "No purchase history.";
        historyHeader.innerText = "You haven't purchased anything."
        return container;
    }

    historyHeader.innerText = "Your Orders";

    // order amount in history
    let orderAmount = document.createElement("div");
    orderAmount.setAttribute("class", "order-amount-in-history");
    orderAmount.innerHTML = "<span style='font-weight:bold;'>" + historyRecord.length + " orders</span>" 
                          + " placed in history.";
    container.appendChild(orderAmount);

    let table = undefined;

    if(historyRecord.length > 0){
        for(let i=0; i<historyRecord.length; i++){
            table = updateHistoryRecord(historyRecord, i);
            container.insertBefore(table, container.childNodes[2]);
        }
        return container;
    }
};

let updateHistoryRecord = (historyRecord, i) =>{
    let table = document.createElement("table");
    table.setAttribute("class", "table");

    let thead = document.createElement("tr");
    thead.setAttribute("class", "theadBgCol");
    table.appendChild(thead);

    let theadOrderTime = document.createElement("th");
    theadOrderTime.setAttribute("class", "orderTime thColor");
    theadOrderTime.innerText = "ORDER PLACED\n" + historyRecord[i].get("orderTime");
    thead.appendChild(theadOrderTime);    

    let theadTotalAmount = document.createElement("th");
    theadTotalAmount.setAttribute("class", "totalAmount thColor");
    theadTotalAmount.innerText = "TOTAL\nCDN$ " + parseFloat(historyRecord[i].get("totalPriceAmount")).toFixed(2).toString();
    thead.appendChild(theadTotalAmount);

    historyRecord[i].get("purchaseItems").forEach((v,k)=>{
        // purchased record in detail
        let trDetailsTitle = document.createElement("tr");
        let trDetailsDesc = document.createElement("tr");
        let trDetalisPrice = document.createElement("tr");
        let trDetailsAmount = document.createElement("tr");
        let trDetailsBlank = document.createElement("tr");
        trDetailsBlank.appendChild(document.createElement("td"));
        table.appendChild(trDetailsTitle);
        table.appendChild(trDetalisPrice);
        table.appendChild(trDetailsAmount);
        table.appendChild(trDetailsDesc);
        table.appendChild(trDetailsBlank);

        // In one purchase record, the image of the item on the left side
        let tdImg = document.createElement("td");
        trDetailsTitle.appendChild(tdImg);
        // tdImg.setAttribute("class", "tdImg");
        tdImg.setAttribute("width", "20%");
        tdImg.setAttribute("rowspan", 5);
        let img = document.createElement("img");
        img.setAttribute("src", historyRecord[i].get("purchaseItems").get(k).itemImageURL);
        img.setAttribute("class", "tdImg hover-pointer");
        img.addEventListener("click", ()=>{
            currentView = "item-detail";
            detailItemId = k;
            render();
        });
        tdImg.appendChild(img);

        // In one purchase record, the item information in detail
        let tdTitle = document.createElement("td");
        tdTitle.setAttribute("class", "purchasedRecordDetails historyItemTitle textLinkHover hover-pointer");
        tdTitle.innerText = historyRecord[i].get("purchaseItems").get(k).itemTitle;
        tdTitle.addEventListener("click", ()=>{
            currentView = "item-detail";
            detailItemId = k;
            render();
        });
        trDetailsTitle.appendChild(tdTitle);
        
        let tdPrice = document.createElement("td");
        tdPrice.setAttribute("class", "purchasedRecordDetails historyItemPrice");
        let tempPrice = historyRecord[i].get("purchaseItems").get(k).itemPrice;
        tdPrice.innerText = "CDN$ " + parseFloat(tempPrice).toFixed(2).toString();
        trDetalisPrice.appendChild(tdPrice);
        
        let tdAmount = document.createElement("td");
        tdAmount.setAttribute("class", "purchasedRecordDetails historyItemAmount");
        tdAmount.innerText = "Purchased Amount: " + historyRecord[i].get("purchaseItems").get(k).itemAmount;
        trDetailsAmount.appendChild(tdAmount);

        let tdDesc = document.createElement("td");
        tdDesc.setAttribute("class", "purchasedRecordDetails historyItemDesc");
        tdDesc.innerText = historyRecord[i].get("purchaseItems").get(k).itemDesc;
        trDetailsDesc.appendChild(tdDesc);
    });
    return table;
};

// The navigation buttons on top
let navigationButtons = () => {
    let homeButton = document.createElement("button")
    homeButton.innerText = "home"
    homeButton.setAttribute("class", "navigationDefault");
    homeButton.addEventListener("click", () => {
        currentView = "items-for-sale"
        console.log("new view", currentView)
        render()
    })

    let addItemButton = document.createElement("button")
    addItemButton.innerText = "add item"
    addItemButton.setAttribute("class", "navigationDefault");
    addItemButton.addEventListener("click", () => {
        currentView = "add-item"
        console.log("new view", currentView)
        render()

    })

    let cartButton = document.createElement("button");
    cartButton.innerText = "cart";
    cartButton.setAttribute("class", "navigationDefault");
    cartButton.addEventListener("click", ()=>{
        currentView = "cart"
        console.log("new view", currentView)
        render()
    });

    let historyButton = document.createElement("button");
    historyButton.innerText = "history";
    historyButton.setAttribute("class", "navigationDefault");
    historyButton.addEventListener("click", ()=>{
        currentView = "history";
        console.log("new view", currentView);
        render(0);
    });

    let container = document.createElement("div")
    container.appendChild(homeButton)
    container.appendChild(addItemButton)
    container.appendChild(cartButton)
    container.appendChild(historyButton)
    container.setAttribute("class", "navigation");
    return container
}

// Rerenders the page
let render = () => {
    // Will contain a reference 
    let toRender = undefined
    let nav = navigationButtons();
    document.body.setAttribute("class", "whiteBody");
    // For debugging purposes
    console.log("rendering view", currentView)
    if (currentView === "items-for-sale") {
        toRender = allItemsView();
        toRender.setAttribute("class", "homeTypesetting");
        nav.childNodes[0].setAttribute("class", "navigationActive");
    } else if (currentView === "item-detail") {
        toRender = itemDetailView()
    } else if (currentView === "add-item") {
        toRender = addItemView()
        nav.childNodes[1].setAttribute("class", "navigationActive");
    } else if (currentView === "cart") {
        toRender = cartView();
        toRender.setAttribute("class", "grey-content");
        nav.childNodes[2].setAttribute("class", "navigationActive");
    } else if (currentView === "history") {
        toRender = historyView();
        nav.childNodes[3].setAttribute("class", "navigationActive");
    } else if (currentView === "modify-item-detail"){
        toRender = modifyDetailsView();
    } else {
        // woops
        alert("unhandled currentView " + currentView)
    }
    toRender.classList.add("content");
    // Removes all children from the body
    document.body.innerHTML = ""
    document.body.appendChild(nav)
    document.body.appendChild(toRender)
}

// Initial render
render()