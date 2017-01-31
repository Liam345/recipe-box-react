import React from 'react';

class RecipeForm extends React.Component{
constructor(props){
    super(props);
    //Edit Modal sends the name , image and ingredients of the selected Recipe
    this.state={
        name:this.props.name,
        image:this.props.image,
        ingredients:this.props.ingredients,

        
    }
    this.createRecipeObject= this.createRecipeObject.bind(this);
}
createRecipeObject(e){
    let item='';
    e.preventDefault();
    //the ingredients to be edited are set as and displayed as an array , to render each 
    //ingredient while editing the must be converted toString first
    const ingredient =this.state.ingredients.toString().split(',').map(i=>{
        return i;
    });
    
    item = {key:this.props.index,name:this.state.name,image:this.state.image,ingredients:ingredient};
    this.props.newRecipe(item);
    } 
handleNameChange(name){
    this.setState({name});
    }
handleImageChange(image){
    this.setState({image});
    }
handleIngChange(ingredients){
    this.setState({ingredients});
   }

    render(){
        
        return(
                <form onSubmit={(e)=>this.createRecipeObject(e)}>
                    <table>
                        <tbody>
                            <tr className="formLabel"><td><label >Recipe name:</label></td></tr>
                            <tr><td><input className="formInput"  type="text" id="recipeName" required defaultValue={this.state.name} onChange={(event)=>this.handleNameChange(event.target.value)}></input></td></tr>
                            <tr className="formLabel"><td> <label>Recipe image url:</label></td></tr>
                            <tr><td><input className="formInput" required type="text" defaultValue={this.state.image} onChange={(event)=>this.handleImageChange(event.target.value)}/></td></tr>
                            <tr className="formLabel"><td><label>Recipe Ingredients:</label></td></tr>
                            <tr><td><textarea className="textArea"  defaultValue={this.state.ingredients} placeholder='Separate each ingredient with a comma' type="text" required onChange={(event)=>this.handleIngChange(event.target.value)}/></td></tr>
                        </tbody>
                     </table>
                        <br/>
                        <br/>
                        <br/>
                    <input type="submit" className="btn" value="Submit"/>
                </form>

);
}
}
export default RecipeForm;
