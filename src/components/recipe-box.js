import React from 'react';
import RecipeAbout from './recipe-about';
import ReactModal from 'react-modal';

class RecipeBox extends React.Component{
    constructor(props){
        super(props);
       // this.onRecipeClicked = this.onRecipeClicked.bind(this);   (Why do I not need to add bind to OnRecipeClicked)
        this.handleCloseModal = this.handleCloseModal.bind(this);
       this.state={
           showModal:false
        };
    }

    onRecipeClicked(term){
            console.log(this.props.recipe);
            this.props.onRecipeSelect(this.props.recipe);
            this.props.onRecipeSelect(this.props.recipe);
             this.setState({showModal:true});
        }
        handleCloseModal(){
       this.setState({showModal:false}); 
    }

    render(){
        const imgsrc = this.props.recipe.image;
        
        return (
            <div className="recipe-item-container" onClick={(event)=>this.onRecipeClicked(event)}>
            <img src={imgsrc} className="recipe-picture" /> 
            <div className="recipe-title">{this.props.recipe.name}</div>
            <ReactModal
            isOpen={this.state.showModal}
            contentLabel ="Model Example"
            >
            <p>Modal Text!</p>
            <p>{this.props.recipe.name}</p>  
            <button onClick={this.handleCloseModal}>Close Modal</button>
            </ReactModal>
            </div>
        );
    }
}

// const RecipeBox =(props)=>{

// const imgsrc = props.recipe.image;

// function onRecipeClicked(term){
//     console.log(props.recipe);
//     props.onRecipeSelect(props.recipe);
//     <RecipeAbout />;
   

// }

// return(
// <div className="recipe-item-container" onClick={(event)=>onRecipeClicked(event)}>
// <img src={imgsrc} className="recipe-picture" /> 
// <div className="recipe-title">{props.recipe.name}</div>
// <RecipeAbout />

// </div>
// );

// } 

export default RecipeBox;