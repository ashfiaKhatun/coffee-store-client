import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {

    const { _id, name, quantity, supplier, taste, photo } = coffee;

    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {

                    fetch(`https://coffee-store-server-teal-gamma.vercel.app/coffee/${_id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.deletedCount > 0) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your coffee has been deleted.",
                                    icon: "success"
                                });
                                const remaining = coffees.filter(cof => cof._id !== _id);
                                setCoffees(remaining);
                            }
                        })

                }
            });
    }

    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure className=""><img src={photo} /></figure>
            <div className="flex justify-between w-full p-4">
                <div>
                    <h2 className="card-title">Name: {name}</h2>
                    <p>{quantity}</p>
                    <p>{supplier}</p>
                    <p>{taste}</p>
                </div>
                <div className="card-actions justify-end">
                    <div className="join join-vertical space-y-2">
                        <button className="btn">View</button>
                        <Link className="btn text-green-700" to={`updateCoffee/${_id}`}>
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(_id)}
                            className="btn text-red-700">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;