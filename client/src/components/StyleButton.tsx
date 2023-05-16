// Styled button component 
export default ({style, value, onClick}:{style:string, value:string, onClick:()=>void}) => {
    const defaultStyle = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
    return (
        <button className={style?style:defaultStyle} onClick={onClick}>{value}</button>
    );
}