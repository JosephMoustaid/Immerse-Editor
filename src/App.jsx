import { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom'; 
import Loader from './Components/Loader.jsx';

function App(props) {
  // Loader Logic 
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

   

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Youssef: Future data source, likely the backend API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result = await response.json();
        setData(result); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Hide the loader when data is fetched
      }
    };

    fetchData();
  }, []); 

  const location = useLocation();  // Not currently used, but you can use it for location-based logic

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="dark-theme container-fluid bg-dynamic">
          <div className="row bg-dynamic">
            <div className="content">
              <Outlet /> {/* Corrected Outlet component */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
