import React from 'react'
import styled from 'styled-components';
export default function Register() {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert("form");
    };
  return (
    <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
            <img src="" alt="" />
            <h1>chat</h1>
            </div>
            <input 
            type="text" 
            placeholder="Username" 
            name="Username"
            onChange={(e) => handleChange(e)}
            className=""/>
        </form>
    </FormContainer>
  )
}

const FormContainer = styled.div``;