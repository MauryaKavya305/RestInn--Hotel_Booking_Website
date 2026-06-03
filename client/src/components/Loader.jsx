import React from 'react';
import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';

const Loader = () => {
    const { navigate } = useAppContext();
    const { nextUrl } = useParams();

    useEffect(() => {
        if(nextUrl) {
            setTimeout(() => {
                navigate(`/${nextUrl}`);
            }, 6000)
        }
    }, [nextUrl]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-26 w-26 border-4 border-gray-400 border-t-primary">

            </div>

        </div>

    )
}

export default Loader;