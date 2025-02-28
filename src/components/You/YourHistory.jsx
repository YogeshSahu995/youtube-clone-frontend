import { useEffect, useState } from "react"
import { clearAllHistory, getUserHistory } from "../../services/userService"
import { Button, Loading2 } from "../LayoutComponents"
import { errorHandler } from "../../utils"
import { Video } from "../Video"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

export function YourHistory() {
    const [allHistory, setAllHistory] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetch, setFetch] = useState(true)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        setLoading(true)
            ; (async () => {
                try {
                    const response = await getUserHistory({ signal })
                    if(!response) return 
                    if (response?.data?.data) {
                        setAllHistory(response.data.data)
                    }
                } catch (error) {
                    toast.error(error.message)
                } finally {
                    setLoading(false)
                }
            })()
        return () => controller.abort()
    }, [fetch])

    const handleClearHistory = async () => {
        try {
            const response = await clearAllHistory()
            if(!response) return 
            if (response?.data?.data) {
                setAllHistory([])
                setFetch(prev => !prev)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    if (loading) {
        return (<Loading2 />)
    }

    return (
        <div className="text-white mt-10">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-medium ml-1">History</h1>
                {allHistory.length > 0 &&
                    <Button
                        value="Clear history"
                        onClick={handleClearHistory}
                    />
                }
            </div>
            {/* <hr className="bg-[#454545] h-[1px] border-none" /> */}
            {allHistory.length > 0 ?
                (<div className="overflow-y-hidden mt-8 pb-2 scrollbar-thin scrollbar-thumb-[#444] scrollbar-track-transparent ">
                    <ul className="flex gap-4">
                        {allHistory?.map((history) => {
                            return (
                                <li key={history._id}>
                                    <Video
                                        gridLayout="grid grid-row justify-items-stretch"
                                        videoInfo={history}
                                        adjustWidth="w-fit"
                                        thumbnailSize="h-[180px] w-[300px]"
                                        history={true}
                                        setFetch={setFetch}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>) :
                (<div className="mt-5 text-[#ffffff85]">
                    Videos that you watch will be shown here. <Link to="/" className="text-[#10e3ff]">Browse videos</Link>
                </div>)
            }
        </div>
    )
}