import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCoffee = () => {

    const coffee = useLoaderData();

    const { _id, name, quantity, supplier, taste, category, details, photo } = coffee;

    const handleUpdateCoffee = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;

        const updatedCoffee = { _id, name, quantity, supplier, taste, category, details, photo };
        console.log(updatedCoffee);

        // send data to the server
        fetch(`https://coffee-store-server-teal-gamma.vercel.app/coffee/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedCoffee)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Coffee Updated Successfully!',
                        icon: 'success',
                        confirmButtonText: 'Okay'
                    })
                }
            })
    }

    return (
        <>
            <h2 className="text-3xl font-extrabold my-6 ml-20">Update Coffee: {name}</h2>
            <div className="px-4 md:px-20">
                <form onSubmit={handleUpdateCoffee}>
                    <div className="grid md:grid-cols-2 gap-4 form-control rounded-xl p-4 md:p-20 bg-[#f4f3f0]">
                        {/* coffee name */}
                        <div>
                            <label className="label-text text-base">Coffee Name</label>
                            <input type="text" name="name" defaultValue={name} placeholder="Coffee Name" className="input  w-full mt-2" />
                        </div>

                        {/* quantity */}
                        <div>
                            <label className="label-text text-base">Available Quantity</label>
                            <input type="text" name="quantity" defaultValue={quantity} placeholder="Available Quantity" className="input w-full mt-2" />
                        </div>

                        {/* supplier */}
                        <div>
                            <label className="label-text text-base">Supplier Name</label>
                            <input type="text" name="supplier" defaultValue={supplier} placeholder="Supplier Name" className="input w-full mt-2" />
                        </div>

                        {/* taste */}
                        <div>
                            <label className="label-text text-base">Taste</label>
                            <input type="text" name="taste" defaultValue={taste} placeholder="Taste" className="input w-full mt-2" />
                        </div>

                        {/* category */}
                        <div>
                            <label className="label-text text-base">Category</label>
                            <input type="text" name="category" defaultValue={category} placeholder="Category" className="input w-full mt-2" />
                        </div>

                        {/* details */}
                        <div>
                            <label className="label-text text-base">Details</label>
                            <input type="text" name="details" defaultValue={details} placeholder="Details" className="input w-full mt-2" />
                        </div>

                        {/* photo url */}
                        <div className="lg:col-span-2">
                            <label className="label-text text-base">Photo URL</label>
                            <input type="text" name="photo" defaultValue={photo} placeholder="Photo URL" className="input w-full mt-2" />
                        </div>

                        {/* photo url */}
                        <div className="lg:col-span-2">
                            <input type="submit" value="Update Coffee" className="border btn border-black rounded-md w-full bg-[#D2B48C] hover:bg-[#a58c6c] hover:text-white py-2 font-bold cursor-pointer" />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateCoffee;