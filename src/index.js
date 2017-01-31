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
        
           //When the user clicks on AddRecipe button an AddRecipe Modal should open up
            addRecipeModal:false,
            editRecipeModal:false,
            recipeToEdit:''
            
            
        };
                this.openAddModal = this.openAddModal.bind(this);
                this.closeAddModal = this.closeAddModal.bind(this);
                this.addRecipeForm = this.addRecipeForm.bind(this);
                this.editRecipeForm = this.editRecipeForm.bind(this);
                this.openEditModal = this.openEditModal.bind(this);
                this.closeEditModal = this.closeEditModal.bind(this);
                
    }
    openAddModal(){
        this.setState({addRecipeModal:true});
        
    }

     closeAddModal(){
       this.setState({addRecipeModal:false}); 
    }

    openEditModal(){
        this.setState({editRecipeModal:true});
        
    }

     closeEditModal(){
       this.setState({editRecipeModal:false}); 
    }
    //add recipe that the user entered in the Form to the page
    addRecipeForm(item){
        console.log("from the main page " +item);
        this.setState({recipes:this.state.recipes.concat(item)});
        console.log("this is"+this);
        this.closeAddModal();
    }

        //edit recipe that the user entered in the Form to the page
    editRecipeForm(item){
        console.log("from the main page " +item);
        this.setState({recipes:this.state.recipes.concat(item)});
        console.log("this is"+this);
        this.closeEditModal();
    }

    //delete recipe when the user clicks delete recipe button on the individual recipe Modal
    deleteRecipe(recipeToDelete){ 
        console.log("This is the recipe to be deleted "+JSON.stringify(recipeToDelete.key));
        this.setState({recipeToDelete});
        
        const allRecipeArr = JSON.parse(localStorage.getItem('recipes'));
        //get index of the recipe to be deleted
        const deletedRecipePos = allRecipeArr.findIndex(recipe=>(recipe.key==(JSON.stringify(recipeToDelete.key))));
        console.log(deletedRecipePos);
        //delete the recipe from the array of all recipes
        allRecipeArr.splice(deletedRecipePos,1);
        this.setState({recipes:allRecipeArr});
   
}

editRecipe(recipeToEdit){
    console.log("Need to edit this recipe");
    console.log(recipeToEdit);
    this.setState({recipeToEdit});
    this.deleteRecipe(recipeToEdit);
    this.openEditModal();
}

    render(){
                
        localStorage.setItem('recipes',JSON.stringify(this.state.recipes));
        const recipesItems = this.state.recipes.map((recipe)=>{
        return  <RecipeBox key={recipe.key} recipe={recipe}  onRecipeDelete={(recipeToDelete)=> this.deleteRecipe(recipeToDelete)} onRecipeEdit={(recipeToEdit)=>this.editRecipe(recipeToEdit)}/>
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
                        <button className="addButton" onClick={this.openAddModal}>Add Recipe</button>
                        {/* Add new Recipe modal only  open if this.state.addRecipeModal is true
                            */}
                        <ReactModal
                        isOpen={this.state.addRecipeModal}
                        contentLabel ="Add Recipe Modal"
                        >
                            <h1 className="recipeHeading">Add New Recipe</h1>  
                            {/*Sends the key of last object+1 as index props. Addition , Deletion and Edit of recipe has been handled in such a way
                                that the last recipe object has the highest value of keys property*/}
                            <RecipeForm  index={this.state.recipes[this.state.recipes.length-1].key+1} newRecipe={ (item)=>this.addRecipeForm(item)}/>
                            <button className="btn" onClick={this.closeAddModal}>Close</button>
                        </ReactModal>
                        {/* Edit new Recipe modal only  open if this.state.addRecipeModal is true
                            */}
                        <ReactModal
                        isOpen={this.state.editRecipeModal}
                        contentLabel ="Edit Recipe Modal"
                        >
                            <h1 className="recipeHeading">Edit Recipe</h1>  
                            <RecipeForm  index={this.state.recipes[this.state.recipes.length-1].key+1} name={this.state.recipeToEdit.name} image={this.state.recipeToEdit.image}
                            ingredients={this.state.recipeToEdit.ingredients} newRecipe={ (item)=>this.editRecipeForm(item)}/>
                        </ReactModal>
                    </footer>
                </div>
                );
            }
        
    
}



ReactDOM.render(<App/>,document.getElementById("app"));