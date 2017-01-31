import React from 'react';

import Ingredient from './recipe-ingredients';
import ReactModal from 'react-modal';

class RecipeBox extends React.Component{
    constructor(props){
        super(props);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
        this.state={
           showModal:false
        };
    }

    onRecipeClicked(term){
            console.log(this.props.recipe);
            this.setState({showModal:true});
        }
    handleCloseModal(){
            this.setState({showModal:false}); 
    }

    deleteRecipe(){
        this.props.onRecipeDelete(this.props.recipe); //sends recipe to index.js as selected recipe. Delete it in index.js on state change
        this.setState({showModal:false}); 
    }
    
    editRecipe(){
        this.props.onRecipeEdit(this.props.recipe);
    }

    render(){
        const imgsrc = this.props.recipe.image;
        const ingredients = this.props.recipe.ingredients;
        const recipeIngredients = ingredients.map((ingredient,index)=>
            <Ingredient key={index} ing={ingredient}/>)
        return (
            <div className="recipe-item-container" onClick={(event)=>this.onRecipeClicked(event)}>
                <img src={imgsrc} className="recipe-picture" /> 
                <div className="recipe-title">{this.props.recipe.name}</div>
                <ReactModal
                isOpen={this.state.showModal}
                contentLabel ="Model Example"
                >
                    <h1 className="recipeHeading">{this.props.recipe.name}</h1>  
                    {recipeIngredients}
                    <button className="btn" onClick={this.handleCloseModal}>Close</button>
                    <button className="btn" onClick={this.deleteRecipe}>Delete Recipe</button>
                    <button className="btn" onClick={this.editRecipe}>Edit Recipe</button>
                </ReactModal>
            </div>
        );
    }
}

export default RecipeBox;