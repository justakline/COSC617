import axios from 'axios';



class BarstoolGetter {
  
    constructor(){
        this.axios = axios;
        
    }

     async getJsonData (url)  {
        return  this.axios.get(url)
                    .then((response) =>{
                        return response.data;
                    }).catch((error) =>{
                        console.error(error)
                        return []
                    })
      

    }

     getParsedData(data){

        var allArticlesParsed = []
        for(const item of data){
            var newJson = {}
            newJson.article_title = this.getArticleTitle(item);
            newJson.article_url = this.getArticleUrl(item);
            newJson.author_name = this.getAuthorName(item);
            newJson.author_avatar = this.getAuthorAvatar(item);
            newJson.article_image= this.getArticleImage(item);
            newJson.comment_count = this.getCommentNumber(item);

            // console.log(newJson)
            allArticlesParsed.push(newJson)
        }
        
        return allArticlesParsed;
                  
    }
    getArticleTitle (json)  {
        return json.title;
    }
    getArticleUrl (json)  {
        return json.url;
    }
    getArticleImage (json)  {
        
        const baseLocation = json.thumbnail.location
        const imageLocation = json.thumbnail.images.small
        // console.log(baseLocation+imageLocation)
        return baseLocation+imageLocation

    }
    getAuthorName (json)  {
        return json.author.name;

    }

    getAuthorAvatar(json){
        return json.author.avatar;

    }
    getCommentNumber(json){
        return json.comment_count;
    }

}





export default BarstoolGetter;