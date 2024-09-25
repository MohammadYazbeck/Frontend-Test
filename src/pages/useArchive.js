import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import * as XLSX from 'xlsx'
import { useUser } from '../contexts/UserContext'
import { toast } from 'react-hot-toast'
import { getFilteredRequests } from '../services/requestsApi'
import { queryClient } from '../main'
import Cookies from 'js-cookie'

export default function useArchive() {
    const initialFilters = Cookies.get('filters')
        ? JSON.parse(Cookies.get('filters'))
        : {
              sortbyUser: 'جميع المحافظات',
              approvedChecked: true,
              declinedChecked: false,
              sortbyDate: 'منذ يومين',
              dateValue: 2,
          }

    const [sortbyUser, setSortByUser] = useState(initialFilters.sortbyUser)
    const [approvedChecked, setApprovedChecked] = useState(
        initialFilters.approvedChecked
    )
    const [declinedChecked, setDeclinedChecked] = useState(
        initialFilters.declinedChecked
    )
    const [sortbyDate, setSortByDate] = useState(initialFilters.sortbyDate)
    const [dateValue, setDateValue] = useState(initialFilters.dateValue)
    const { state } = useUser()

    const dateMap = {
        'منذ يومين': 2,
        'منذ أسبوع': 7,
        'منذ أسبوعين': 14,
        'منذ شهر': 30,
        'منذ شهرين': 60,
        'منذ ثلاثة أشهر': 90,
        'منذ ستة أشهر': 180,
        'منذ سنة': 365,
    }

    useEffect(() => {
        const value = dateMap[sortbyDate] || 2
        setDateValue(value)
    }, [sortbyDate])

    useEffect(() => {
        Cookies.set(
            'filters',
            JSON.stringify({
                sortbyUser,
                approvedChecked,
                declinedChecked,
                sortbyDate,
                dateValue,
            })
        )
    }, [sortbyUser, approvedChecked, declinedChecked, sortbyDate, dateValue])

    const {
        data: requests,
        isPending: isLoading,
        isRefetching,
        error,
    } = useQuery({
        queryKey: [`filtered-request-${dateValue}-days`],
        queryFn: () => getFilteredRequests(dateValue),
        enabled: !!dateValue,
        staleTime: 1000 * 60 * 300,
        onError: (err) => {
            toast.error('ERROR Fetching Data', err)
        },
    })

    const handleRefresh = () => {
        queryClient.invalidateQueries({
            queryKey: [`filtered-request-${dateValue}-days`],
        })
    }

    const handleSaveArchive = () => {
        const worksheet = XLSX.utils.json_to_sheet(archiveRequests)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Archive')

        XLSX.writeFile(workbook, 'archive_requests.xlsx')

        toast.success('عملية تحميل الأرشيف تمت بنجاح ', {
            style: {
                border: '1px solid #f9fafb ',
                padding: '14px',
                color: '#FFFAEE',
                background: '#581c87',
                fontWeight: 'bold',
                textAlign: 'right',
            },
            iconTheme: {
                primary: '#FFFAEE',
                secondary: '#581c87',
            },
            duration: 15000,
        })
    }

    const archiveRequests = useMemo(() => {
        return requests?.data?.data
            .filter((request) => {
                const isUserMatch =
                    sortbyUser !== 'جميع المحافظات'
                        ? request?.username?.toLowerCase() ===
                          sortbyUser.toLowerCase()
                        : true

                const isApprovedMatch =
                    approvedChecked && request.status === 'accepted'
                const isDeclinedMatch =
                    declinedChecked && request.status === 'declined'

                const isStatusMatch = isApprovedMatch || isDeclinedMatch

                return (
                    request.status !== 'pending' && isUserMatch && isStatusMatch
                )
            })
            .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate))
    }, [sortbyUser, approvedChecked, declinedChecked, requests])

    return {
        sortbyUser,
        setSortByUser,
        sortbyDate,
        setSortByDate,
        approvedChecked,
        setApprovedChecked,
        declinedChecked,
        setDeclinedChecked,
        archiveRequests,
        handleSaveArchive,
        error,
        isLoading,
        handleRefresh,
        isRefetching,
    }
}
