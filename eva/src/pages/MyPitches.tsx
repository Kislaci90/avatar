import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_MY_PITCHES = gql`
  query GetMyPitches {
    myPitches {
      id
      name
      description
      pricePerHour
      pitchType
      surfaceType
      hasLighting
      isActive
      location {
        address
        hasParking
      }
    }
  }
`;

const MyPitches: React.FC = () => {
  const { loading, error, data } = useQuery(GET_MY_PITCHES);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Football Pitches</h1>
        <Link
          to="/pitches/new"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add New Pitch
        </Link>
      </div>

      {data?.myPitches?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't added any pitches yet.</p>
          <Link
            to="/pitches/new"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Add Your First Pitch
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.myPitches?.map((pitch: any) => (
            <div key={pitch.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{pitch.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    pitch.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {pitch.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-2">{pitch.description}</p>
                <p className="text-gray-500 mb-4">{pitch.location?.address}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-green-600 font-semibold">
                    £{pitch.pricePerHour}/hour
                  </span>
                  <span className="text-sm text-gray-500">
                    {pitch.pitchType?.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="flex space-x-2 mb-4">
                  {pitch.hasLighting && (
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">
                      Lighting
                    </span>
                  )}
                  {pitch.location?.hasParking && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      Parking
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Link
                    to={`/pitches/${pitch.id}/edit`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded transition-colors"
                  >
                    Edit
                  </Link>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPitches; 