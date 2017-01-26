import React from 'react';
import ReactDOM from 'react-dom';
import RecipeBox from './components/recipe-box';
import RecipeForm from './components/recipe-form';
import ReactModal from 'react-modal';
import {Router,Route,Link,IndexRoute,hashHistory,browserHistory} from 'react-router';
require('../style/style.scss');


class App extends React.Component{
    
    constructor(props){
        
        super(props);
        this.state={
           
            recipes: JSON.parse(localStorage.getItem('recipes'))||[{key:0,name:"Salsa Verde",image:"http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/04/salsa-verde-2.jpg?itok=R9-68UMh",ingredients:[["tarragon"],["parsley"],["garlic cloves"],["dijon mustard"]]},
            {key:1,name:"Spicy black bean tacos",image:"http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/spicy-black-bean-tacos.jpg?itok=RTBXRL7L",ingredients:[["olive oil"],["black beans"],["avocado"],["taco shells"]]},
            {key:2,name:"Maple mustard pulled pork",image:"http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--1119469_10.jpg?itok=2GIQyKfz",ingredients:[["pork shoulder"],["sea salt"],["mustard"]]},
            {key:3,name:"Salmon and spinach with Tartare sauce",image:"http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--52867_12.jpg?itok=pnLXWqFK", ingredients:[["salmon"],["spinach"],["creme"],["olive oil"]]}
            ],
            deletedRecipe:'',
           
            addRecipeModal:false
        
            
            
        };
                this.handleOpenModal = this.handleOpenModal.bind(this);
                this.handleCloseModal = this.handleCloseModal.bind(this);
                this.addRecipeForm = this.addRecipeForm.bind(this);
                
    }
    handleOpenModal(){
        this.setState({addRecipeModal:true});
        
    }

     handleCloseModal(){
       this.setState({addRecipeModal:false}); 
    }

    //add recipe that the user entered in the Form to the page
    addRecipeForm(item){
        console.log("from the main page " +item);
        this.setState({recipes:this.state.recipes.concat(item)});
        console.log("this is"+this);
        this.handleCloseModal();
    }

    //delete recipe when the user clicks delete recipe button on the individual recipe Modal
    deleteRecipe(deletedRecipe){ 
        console.log("This is the recipe to be deleted "+JSON.stringify(deletedRecipe.key));
        this.setState({deletedRecipe});
        
        const allRecipeArr = JSON.parse(localStorage.getItem('recipes'));
        //get index of the recipe to be deleted
        const deletedRecipePos = allRecipeArr.findIndex(recipe=>(recipe.key==(JSON.stringify(deletedRecipe.key))));
        console.log(deletedRecipePos);
        //delete the recipe from the array of all recipes
        allRecipeArr.splice(deletedRecipePos,1);
        this.setState({recipes:allRecipeArr});
   
}


    render(){
                
        localStorage.setItem('recipes',JSON.stringify(this.state.recipes));
        const recipesItems = this.state.recipes.map((recipe)=>{
        return  <RecipeBox key={recipe.key} recipe={recipe}  onRecipeDelete={(deletedRecipe)=> this.deleteRecipe(deletedRecipe)}/>
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
                        <button className="addButton" onClick={this.handleOpenModal}>Add Recipe</button>
                        <ReactModal
                        isOpen={this.state.addRecipeModal}
                        contentLabel ="Model Example"
                        >
                            <h1 className="recipeHeading">Add your Recipe</h1>  
                            <RecipeForm  index={this.state.recipes.length} newRecipe={ (item)=>this.addRecipeForm(item)}/>
                            <button className="btn" onClick={this.handleCloseModal}>Close Modal</button>
                        </ReactModal>
                    </footer>
                </div>
                );
            }
        
    
}



ReactDOM.render(<App/>,document.getElementById("app"));