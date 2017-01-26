import React from 'react';

class RecipeForm extends React.Component{
constructor(props){
    super(props);
    this.state={
        name:'',
        image:'',
        ingredient:'',
        ingredients:''
        
    }
    this.createRecipeObject= this.createRecipeObject.bind(this);
}
createRecipeObject(e){
    let item='';
    e.preventDefault();
    const ingredient =this.state.ingredient.split(',').map(i=>{
        return i;
    });
    this.setState({ingredients:ingredient});
    item = {key:this.props.index,name:this.state.name,image:this.state.image,ingredients:ingredient};
    this.props.newRecipe(item);
    } 
handleNameChange(name){
    this.setState({name});
    }
handleImageChange(image){
    this.setState({image});
    }
handleIngChange(ingredient){
    this.setState({ingredient});
   }

    render(){
        
        return(
                <form onSubmit={(e)=>this.createRecipeObject(e)}>
                    <table>
                        <tbody>
                            <tr className="formLabel"><td><label >Recipe name:</label></td></tr>
                            <tr><td><input className="formInput"  type="text" id="recipeName" required onChange={(event)=>this.handleNameChange(event.target.value)}/></td></tr>
                            <tr className="formLabel"><td> <label>Recipe image url:</label></td></tr>
                            <tr><td><input className="formInput" required type="text" onChange={(event)=>this.handleImageChange(event.target.value)}/></td></tr>
                            <tr className="formLabel"><td><label>Recipe Ingredients:</label></td></tr>
                            <tr><td><textarea className="textArea"  placeholder='Separate each ingredient with a comma' type="text" required onChange={(event)=>this.handleIngChange(event.target.value)}/></td></tr>
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
