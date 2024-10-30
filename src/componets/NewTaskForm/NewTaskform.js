import React, { Component } from 'react';
import "./NewTaskform.css"

export default class NewTaskForm extends Component{
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          const text = event.target.value.trim();
          if (text && !/^\s*$/.test(text)) {
            this.props.onTaskAdded(text);
            event.target.value = ''; 
          }
          else{
            event.target.value = 'Имя задачи не задано';
          }
        }
    }
    render(){
        return (
        <input placeholder='What needs to be done?'
         className='new-todo'
         onKeyDown={this.handleKeyDown}
        />
    )
    }
}




