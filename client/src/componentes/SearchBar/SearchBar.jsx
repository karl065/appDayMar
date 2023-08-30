const SearchBar = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="inline-block relative mr-2">
        <input
          type="text"
          placeholder="Buscar"
          className="bg-auto rounded-md w-auto text-black font-bold"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-red-900 font-bold">
          X
        </button>
      </div>
      <button>
        <img
          src="https://res.cloudinary.com/dpjeltekx/image/upload/v1693410322/appDayMar/app/search_p8qit4.png"
          alt="Lupa búsqueda"
          className="w-8 h-8 border-white"
        />
      </button>
    </div>
  );
};

export default SearchBar;
