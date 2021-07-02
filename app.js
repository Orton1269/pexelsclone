class PhotoGallery{
    constructor(){
        this.API_KEY="563492ad6f91700001000001aa36f140408c4304a03b3a0f1a28b71c";
        this.galleryDiv=document.querySelector(".gallery");
        this.searchFrom=document.querySelector(".header form")
        this.loadMore=document.querySelector(".load-more");
        this.pageIndex=1;
        this.searchValue="";
        this.eventHandle();
    }
    eventHandle()
    {
        document.addEventListener("DOMContentLoaded",()=>{
            this.getImg(1);
        })
        this.searchFrom.addEventListener("submit",(e)=>{
            this.pageIndex=1;
            this.getSearchedImg(e);
        })
        this.loadMore.addEventListener("click",(e)=>{
            this.loadMoreImg(e);
        })
    }
    async getImg(index){
        this.loadMore.setAttribute("data-img","curated")
        const baseURL=`https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
        const data=await this.fetchImages(baseURL);
        this.GenrateHTML(data.photos);
        console.log(data);
    }
    async fetchImages(baseURL){
        const response=await fetch(baseURL,{
            nethod:"GET",
            headers:{
                Accept:"applications/json",
                Authorization: this.API_KEY,
            },
        });
        const data=await response.json();
        return data;
    }
    GenrateHTML(photos){
        photos.forEach((photo)=>{
            const item=document.createElement("div");
            item.classList.add("item");
            item.innerHTML=`
            <a href='${photo.src.original}' target="_blank">
            <img src="${photo.src.medium}">
            <h3>${photo.photographer}</h3>
            </a>
            `
            this.galleryDiv.appendChild(item);
        });
    }
    async getSearchedImg(e){
        this.loadMore.setAttribute("data-img","search")
        e.preventDefault();
        this.galleryDiv.innerHTML="";
        const searchValue=e.target.querySelector("input").value;
        this.searchValue=searchValue;
        const baseURL=`https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`;
        const data=await this.fetchImages(baseURL);
        this.GenrateHTML(data.photos);
        e.target.reset(); 
    }
    async getMoreSearchImg(index){
        const baseURL=`https://api.pexels.com/v1/search?query=${searchValue}&page=${index}&per_page=12`;
        const data=await this.fetchImages(baseURL);
        this.GenrateHTML(data.photos);
    }

    loadMoreImg(e){
        let index=++this.pageIndex;
        const loadMoreData=e.target.getAttribute("data-img");
        if(loadMoreData==="curated")
        {
            this.getImg(index);
        }
        else{
            this.getMoreSearchImg(index);
        }
    }

}
const gallery=new PhotoGallery()