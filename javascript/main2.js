"use strict";
let categories = [];
let products = [];
let types = [];
let newArray = [];
let $output = $('#output');
let $dropDown = $('#dropdown');
let dropDownString = "";
let productString = "";
// this makes sure everythign has been loaded before it runs any code
$(document).ready(() => {

    function populateDropdown(data) {
        dropDownString = `<select id="select">`;
            dropDownString += `<option value=""></option>`;
        for(let i = 0; i < data.categories.length; i++) {
            dropDownString += `<option value="${data.categories[i].id}">${data.categories[i].name}</option>`;
        }
        dropDownString += `</select>`;
        $dropDown.append(dropDownString);
    }

    function getCategories() {
        return new Promise((resolve, reject) => {
            $.ajax({
            url: "../json/categories.json"
            }).done((data) => {
                resolve(data);
            }).fail((xhr, status, error) => {
                reject(error);
            });
        });
    }

    function getProducts() {
        return new Promise((resolve, reject) => {
            $.ajax({
            url: "../json/products.json"
            }).done((data) => {
                resolve(data);
            }).fail((xhr, status, error) => {
                reject(error);
            });
        });
    }

    function getTypes() {
        return new Promise((resolve, reject) => {
            $.ajax({
            url: "../json/types.json"
            }).done((data) => {
                resolve(data);
            }).fail((xhr, status, error) => {
                reject(error);
            });
        });
    }

    function onChangeListener() {
        $('#select').change((event) => {
            // event.target.value is the id on the categories array
            populateData(event.target.value, $('#select option:selected').text());
        });
    }

    function populateData(categoriesId, selectedCategory) {
        categoriesId = parseInt(categoriesId);

        var string = `<center><h3>${selectedCategory}</h3></center>`;
        for(let i = 0; i < products.products.length; i++) {
            var currentProduct = products.products[i].fairy_sparklers;
            if(currentProduct.type === categoriesId) {
                string += `<div class="col-md-3"><span><strong>Product Name:</strong> ${currentProduct.name}<br /></span>`;
                string += `<span><strong>Category Name:</strong> ${selectedCategory}<br /></span>`;
                string += `<span><strong>Description:</strong> ${currentProduct.description}</span>`;
                string += `</div>`;
            }
        }
        $output.html(string);
    }

    getCategories().then((dataPass)  => {
        categories = dataPass;
        console.log("categories", categories);
        populateDropdown(categories);
        onChangeListener();
    });

    getProducts().then((dataPass)  => {
        products = dataPass;
        console.log("products", products);
    });

    getTypes().then((dataPass)  => {
        types = dataPass;
        console.log("types", types);
    });


});