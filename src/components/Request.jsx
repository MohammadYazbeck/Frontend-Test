/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import ShowRequestButton from './buttons/ShowRequestButton'
import users from '../data/users.json'

export default function Request({ request }) {
    const navigate = useNavigate()
    const userGovenorate = users.find(
        (userGov) => userGov.username === request.username
    )

    return (
        <div
            key={request.requestid}
            className="mb-2 flex flex-col items-end rounded-3xl border px-3 py-4 text-right shadow-sm shadow-purple-900/60 sm:flex-row sm:items-center sm:justify-end sm:px-10"
        >
            <div className="flex w-full flex-col items-end px-4 text-lg hover:cursor-default sm:text-xl">
                <div className="flex w-full justify-between border-b-2 border-b-purple-50 py-2">
                    <p className="font-semibold text-gray-600">
                        {request.username}
                    </p>
                    <p className="ml-2 font-bold text-purple-900/90">
                        :اسم المستخدم
                    </p>
                </div>
                <div className="flex w-full justify-between border-b-2 border-b-purple-50 py-2">
                    <p className="font-semibold text-gray-600">
                        {userGovenorate?.governorate}
                    </p>
                    <p className="ml-2 font-bold text-purple-900/90">
                        :المحافظة
                    </p>
                </div>
                <div className="flex w-full justify-between border-b-2 border-b-purple-50 py-2">
                    <p className="flex items-center gap-2 font-semibold text-gray-600">
                        <span className="text-sm">{'ل.س'}</span>

                        {request.calculatedCredit}
                    </p>
                    <p className="ml-2 font-bold text-purple-900/90">
                        :قيمة الرصيد
                    </p>
                </div>
                <div className="flex w-full justify-between border-b-2 border-b-purple-50 py-2">
                    <p className="flex font-semibold text-gray-600">
                        {request.destinationOrg}
                    </p>
                    <p className="ml-2 font-bold text-purple-900/90">
                        :الجهة المحول لها
                    </p>
                </div>
                <div className="flex w-full justify-between border-b-2 border-b-purple-50 py-2">
                    <p className="font-semibold text-gray-600">
                        {request.requestDate?.split('T')[0]}
                    </p>
                    <p className="ml-2 font-bold text-purple-900/90">
                        :تاريخ الطلب
                    </p>
                </div>
                <div className="flex w-full justify-between border-b-2 border-b-purple-50 py-2">
                    <p
                        className={`font-semibold capitalize ${request.status === 'pending' ? 'text-orange-500' : request.status === 'accepted' ? 'text-green-500' : request.status === 'declined' ? 'text-red-500' : 'text-gray-500'} `}
                    >
                        {request.status}
                    </p>
                    <p className="ml-2 font-bold text-purple-900/90">
                        :حالة الطلب
                    </p>
                </div>
                <div className="mb-3 mt-10 flex w-full items-center justify-center">
                    <ShowRequestButton
                        onClick={() => {
                            navigate('request', {
                                state: request,
                                replace: true,
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
