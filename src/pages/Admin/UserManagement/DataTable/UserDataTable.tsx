import { Box, Button, IconButton, Modal} from '@mui/material'
import { DataGrid, GridColDef} from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/configStore'
import { delUserAPI, getPaginationUserAPI, userLogin } from '../../../../redux/reducers/userReducer'
import {FaEdit,FaTrash} from 'react-icons/fa'
import EditUserForm from '../../../../components/Forms/EditUserForm'
import {FaPlus} from 'react-icons/fa'
import AddUserForm from '../../../../components/Forms/AddUserForm'

type Props = {}

export interface userDataType {
  isLoading: boolean,
  total: number,
  page: number,
  pageSize: number
}

export default function UserDataTable({}: Props) {
  
  const [open,setOpen] = useState(false)
  const [isEditForm,setIsEditForm] = useState(true)
  const [dataModal,setDataModal] =useState<userLogin | null | undefined>(null)
  const dispatch:AppDispatch= useDispatch()
  const{userData, totalRow} = useSelector((state:RootState) => state.userReducer)
  
  const columns:GridColDef[] = [
    {
      field: 'id', headerName:'ID',width:70,align:'center',headerAlign:'center',headerClassName:'header-datagrid'
    },
    {
      field: 'name', headerName:'Name',width:220,headerClassName:'header-datagrid'
    },
    {
      field: 'gender', headerName:'Gender',width:70,valueFormatter:(param)=>{
       return param.value === true ? 'Nam':'Nữ'
      },align:'center',headerAlign:'center',headerClassName:'header-datagrid'
    },
    {
      field: 'birthday', headerName:'Birthday',width:100,headerClassName:'header-datagrid'
    },
    {
      field: 'phone', headerName:'Phone',width:120,headerClassName:'header-datagrid'
    },
    {
      field: 'email', headerName:'Email',flex:1,headerClassName:'header-datagrid'
    },
    {
      field: 'role', headerName:'Role',width:80,align:'center',headerAlign:'center',headerClassName:'header-datagrid'
    },
    {
      field: 'action', headerName:'Action',width:100,headerClassName:'header-datagrid',align:'center',headerAlign:'center', renderCell: (params)=>(
        <Box>
          <IconButton color='warning' onClick={(e)=>{
            const userList:userLogin[] = [...userData]
            const dataEditModal = userList.find(item => (item.id === params.id))
            setIsEditForm(true)
            setOpen(true)
            
            setDataModal(dataEditModal)
          }}>
            <FaEdit size={18}/>
          </IconButton>
         
          <IconButton color='error' onClick={()=>{
            const actionThunk = delUserAPI(params.id);
            dispatch(actionThunk)
          }}>
            <FaTrash size={18}/>
          </IconButton>
        </Box>
      )
    },
  
    
  ]
  const [pageState,setPageState] = useState<userDataType>({
    isLoading: false,
    total:0,
    page:1,
    pageSize:10

  })

  const[refresh,setRefresh] = useState(false)

  useEffect(()=>{
    const actionThunk = getPaginationUserAPI(pageState.page,pageState.pageSize)
    dispatch(actionThunk);

  },[pageState.page,pageState.pageSize,totalRow,refresh])
  return (
    <>
    <Box sx={{
      
      textAlign:'end',
      margin: '12px 20px'
    }}>
      <Button startIcon={<FaPlus />} variant='contained' color='success' onClick={()=>{
        setIsEditForm(false)
        setOpen(true)
      }}>Thêm
      </Button>
    </Box>
    <DataGrid 
    autoHeight
    rows={userData}
    rowCount={totalRow}
    getRowId={(row)=> row.id}
    loading={refresh}
    rowsPerPageOptions={[10,15,20]}
    pagination
    page={pageState.page -1}
    pageSize={pageState.pageSize}
    paginationMode="server"
    onPageChange={(newPage) => setPageState(prev =>({...prev,page:newPage+1}))}
    onPageSizeChange={(newPageSize) => setPageState(prev =>({...prev,pageSize:newPageSize}))}
    columns={columns}
    />
     <Modal open={open}
          onClose={()=>{
            setOpen(false)
          }}
          >
            <Box sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 700,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}>
              {isEditForm?<EditUserForm dataDefault={dataModal} loading={setRefresh}></EditUserForm>:<AddUserForm totalRow={totalRow} loading={setRefresh}></AddUserForm>}
            </Box>
          </Modal>
    </>
  )
}