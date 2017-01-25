import React from 'react';
import ReactDOM from 'react-dom';
import RecipeBox from './components/recipe-box';
import ReactModal from 'react-modal';
require('../style/style.scss');


class App extends React.Component{
    
    constructor(props){
        
        super(props);
        this.state={
            // recipes:[{key:0,name:"Salsa Verde",image:"http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/04/salsa-verde-2.jpg?itok=R9-68UMh",ingredients:["tarragon","parsley","garlic cloves","dijon mustard"]},
            // {key:1,name:"Spicy black bean tacos",image:"http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/spicy-black-bean-tacos.jpg?itok=RTBXRL7L",ingredients:["olive oil","black beans","avocado","taco shells"]},
            // {key:2,name:"Maple mustard pulled pork",image:"http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--1119469_10.jpg?itok=2GIQyKfz",ingredients:["pork shoulder","sea salt","mustard"]},
            // {key:3,name:"Salmon and spinach with Tartare sauce",image:"http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--52867_12.jpg?itok=pnLXWqFK", ingredients:["salmon","spinach","creme","olive oil"]}
            // ],
            recipes: JSON.parse(localStorage.getItem('recipes'))||[{key:0,name:"Salsa Verde",image:"http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/04/salsa-verde-2.jpg?itok=R9-68UMh",ingredients:["tarragon","parsley","garlic cloves","dijon mustard"]},
            {key:1,name:"Spicy black bean tacos",image:"http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/spicy-black-bean-tacos.jpg?itok=RTBXRL7L",ingredients:["olive oil","black beans","avocado","taco shells"]},
            {key:2,name:"Maple mustard pulled pork",image:"http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--1119469_10.jpg?itok=2GIQyKfz",ingredients:["pork shoulder","sea salt","mustard"]},
            {key:3,name:"Salmon and spinach with Tartare sauce",image:"http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--52867_12.jpg?itok=pnLXWqFK", ingredients:["salmon","spinach","creme","olive oil"]}
            ],
            selectedRecipe:'',
            count:4,
            showModal:false,
        
            
            
        };
                this.handleOpenModal = this.handleOpenModal.bind(this);
                this.handleCloseModal = this.handleCloseModal.bind(this);
                this.addNewItem = this.addNewItem.bind(this);
    }
         handleOpenModal(){
        this.setState({showModal:true});
    }

     handleCloseModal(){
       this.setState({showModal:false}); 
    }

    addNewItem(){
        let ckey = this.setState({count:(this.state.count)+1});
        console.log("ckey  "+this.state.count);
        console.log("before"+this.state.recipes);
        this.setState({recipes:this.state.recipes.concat({key:this.state.count,name:"Tim Sykes",image:"https://static.pexels.com/photos/5317/food-salad-restaurant-person.jpg",ingredients:["tomato","pasta","pizza"]})});
        
        
}

            render(){console.log("after"+this.state.recipes);
            localStorage.setItem('recipes',JSON.stringify(this.state.recipes));
                const recipesItems = this.state.recipes.map((recipe)=>{
                      return  <RecipeBox key={recipe.key} recipe={recipe}  onRecipeSelect={(selectedRecipe)=> this.setState({selectedRecipe}) }/>
                });
                return (
                    <div>
                    
                    <div>
                    <h1 className="recipeHeading">Recipe Box </h1>
                    
                    </div>
                    <div className="recipes-container">
                    {recipesItems}
                    </div>
                    <footer>
                    <button className="addButton" onClick={this.addNewItem}>Add New Recipe</button>
                    </footer>
                    
                    </div>
                );
            }
        
    
}

ReactDOM.render(<App/>,document.getElementById("app"));