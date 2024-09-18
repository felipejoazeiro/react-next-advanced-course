import './styles.css'

export const TextInput = ({searchValue, handleChange})=>{
    return (
        <input 
            className='text-input'
            type="search" 
            name="" 
            id="" 
            onChange={handleChange} 
            value={searchValue}
            placeholder='Type your search'
        />
    );
}