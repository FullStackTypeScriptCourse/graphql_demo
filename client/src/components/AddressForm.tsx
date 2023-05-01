import { useState } from 'react';

// apollo client
import { ApolloCache, useMutation } from '@apollo/client';
import GET_ALL_PEOPLE from '../queries/GetAllPeople';
import GET_ALL_ADDRESSES from '../queries/GetAllAddresses';
// import CREATE_PERSON from '../queries/CreatePerson';
import CREATE_ADDRESS from '../queries/CreateAddress';
import UPDATE_ADDRESS from '../queries/EditAddress';
import { Address } from '../types';

const AddressForm = ({personId, address, setAddress}: { personId: String, address: Address, setAddress:(address:Address)=>void }) => {
    const [errorMsg, setError] = useState('');
    const [mutateFunction, { data, loading, error }] = useMutation(CREATE_ADDRESS, {
         refetchQueries: [GET_ALL_PEOPLE]
    }); //mutateFunction is the function to call for server update. refetchQueries is the list of queries to refetch after the mutation is done. And if they were used with useQuery, they will be updated with the new data.
    const [updateAddress, updateAddressData] = useMutation(UPDATE_ADDRESS,{
        refetchQueries: [GET_ALL_PEOPLE]
    }); 
    if (loading || updateAddressData.loading) return <>'Submitting...'</>;
    if (error || updateAddressData.error) return <>`Submission error! ${error?error.message:updateAddressData.error}`</>;

    const createAddress = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!address.street || !address.city || !address.country || !address.zip){
            setError('Please fill in all fields'); 
            return;
        }
        mutateFunction({ variables: address });
        setAddress({street:"",city:"",country:"",zip:""});
        setError('');
    }

    const editAddress = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!address.street || !address.city || !address.country || !address.zip){
            setError('Please fill in all fields');
            return;
        }
        updateAddress({ variables: {updateId:address.id, street:address.street, city:address.city, country:address.country, zip:address.zip } });
        setAddress({street:"",city:"",country:"",zip:""});
        setError('');
    }
        

    return (
        <>
            <h2 className="flex items-center text-4xl  dark:text-white">Create a new Address</h2>

            <div className="p-1.5 flex items-center justify-center h-screen">
                {/* FORM */}
                <div className="shadow-lg p-10">
                <form className="max-w-sm" onSubmit={
                    address.id?editAddress:createAddress
                }>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Street
                            </label>
                            {/* INPUT FIELD  */}
                            <input name="name" value={address.street} onChange={(evt) => setAddress({ ...address, street: evt.target.value })} className="appearance-none block  bg-gray-50 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Street" />

                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                City
                            </label>
                            {/* INPUT FIELD  */}
                            <input name="name" value={address.city} onChange={(evt) => setAddress({ ...address, city: evt.target.value })} className="appearance-none block  bg-gray-50 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="City" />

                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Country
                            </label>
                            {/* INPUT FIELD  */}
                            <input name="name" value={address.country} onChange={(evt) => setAddress({ ...address, country: evt.target.value })} className="appearance-none block  bg-gray-50 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Country" />

                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                               Zip 
                            </label>
                            {/* INPUT FIELD  */}
                            <input name="name" value={address.zip} onChange={(evt) => setAddress({ ...address, zip: evt.target.value })} className="appearance-none block  bg-gray-50 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Zip" />
                            <h2 className="text-red-400">{errorMsg}</h2>
                            <div className="inline-flex rounded-md shadow-sm" role="group">
                            <input type="submit" value="Submit" 
                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" />
                            <button onClick={(evt) => {evt.preventDefault(); setAddress({street: "", city:"",country:"",zip:""});}} 
                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                            >Reset</button>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}
export default AddressForm;