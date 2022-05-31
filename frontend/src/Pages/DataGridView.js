import { Button, ButtonGroup, TableHead, TableRow, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { HeadingData } from '../DataHead/HeadingData';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import Header from './Header';
import { Footer } from './Footer';

export default function DataGridView() {

  const [data, setData] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [refresh, setRefresh] = React.useState(false);
  

  //predict *************************************************
  const handleChangePredict = async (event) => {
    event.preventDefault();
    
    console.log(selectedRow)
    for (let i = 0; i < selectedRow.length; i++) {
      const obj = data.find(o => o.sl_no === selectedRow[i]);
      console.log(obj)
      let data_selected = {
        business_code: obj["business_code"],
        cust_number: obj["cust_number"],
        clear_date: obj["clear_date"],
        buisness_year: obj["buisness_year"],
        doc_id: obj["doc_id"],
        posting_date: obj["posting_date"],  
        name_customer: obj["name_customer"],
        due_in_date: obj["due_in_date"],
        baseline_create_date: obj["baseline_create_date"],
        cust_payment_terms: obj["cust_payment_terms"],
        converted_usd: obj["total_open_amount"],

      }
    
      console.log(data_selected)
      await axios.post('http://127.0.0.1:5000/', data_selected)
        .then(res => {
          console.log(res.data)
          console.log(res.data[0].aging_bucket)
          obj["aging_bucket"] = res.data[0].aging_bucket
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  
  //ADD *************************************************************

  const [addText, setAddText] = React.useState({
    sl_no: '',
    business_code: '',
    cust_number: '',
    clear_date: '',
    buisness_year: '',
    doc_id: '',
    posting_date: '',
    document_create_date: '',
    document_create_date1: '',
    due_in_date: '',
    invoice_currency: '',
    document_type: '',
    posting_id: '',
    area_business: '',
    total_open_amount: '',
    baseline_create_date: '',
    cust_payment_terms: '',
    invoice_id: '',
    aging_bucket: '',
    isOpen: '',
    is_deleted: '',
    business_name: '',
    name_customer: '',
  });
  const handleChangeAdd = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddText({ ...addText, [name]: value });
  }

  const handleSubmitAdd = async (event) => {
    let res = await fetch('http://localhost:8080/HRC_Jdbc/Insert_data', {
      method: 'POST',
      body: new URLSearchParams({
        sl_no: addText.sl_no,
        business_code: addText.business_code,
        cust_number: addText.cust_number,
        clear_date: addText.clear_date,
        buisness_year: addText.buisness_year,
        doc_id: addText.doc_id,
        posting_date: addText.posting_date,
        document_create_date: addText.document_create_date,
        document_create_date1: addText.document_create_date1,
        due_in_date: addText.due_in_date,
        invoice_currency: addText.invoice_currency,
        document_type: addText.document_type,
        posting_id: addText.posting_id,
        area_business: addText.area_business,
        total_open_amount: addText.total_open_amount,
        baseline_create_date: addText.baseline_create_date,
        cust_payment_terms: addText.cust_payment_terms,
        invoice_id: addText.invoice_id,
        aging_bucket: addText.aging_bucket,
        isOpen: addText.isOpen,
        is_deleted: addText.is_deleted,
        business_name: addText.business_name,
        name_customer: addText.name_customer,

      })
    });
    console.log(res);
    // let data = await res.json();
    // console.log(data);
    setOpenAdd(false);
    window.location.reload(false);
  }
  const handleClickOpenAdd = () => {
    setOpenAdd(true);
    const maxSlNo = Math.max(...data.map(item => item.sl_no), 0);
    addText.sl_no = maxSlNo + 1;

   
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };


  const [openAdd, setOpenAdd] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [disableEdit, setEditDisable] = React.useState(true);
  const [disableDelete, setDeleteDisable] = React.useState(true);
  
  const [editText, setEditText] = React.useState({
    sl_no: "",
    invoice_currency: "",
    cust_payment_terms: "",
  });

  //Dialog box EDIT ***************************************

  const handleChangeEdit = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setEditText(values => ({ ...values, [name]: value }));

  }



  const [openEdit, setOpenEdit] = React.useState(false);
  const handleClickOpenEdit = () => {
    console.log(selectedRow);

    setOpenEdit(true);
    const ob = data.find(o => o.sl_no === selectedRow[0]);
    editText.invoice_currency = ob['invoice_currency'];
    editText.sl_no = ob['sl_no'];
    editText.cust_payment_terms = ob['cust_payment_terms'];
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleSubmitEdit = async e => {
    e.preventDefault();
    console.log(editText);
    let res = await fetch('http://localhost:8080/HRC_Jdbc/edit_data_servelet', {
      method: 'POST',
      body: new URLSearchParams({
        sl_no: editText.sl_no,
        invoice_currency: editText.invoice_currency,
        cust_payment_terms: editText.cust_payment_terms,
      })
    });
    console.log(res);
    if (!res.ok) {
      alert("data not updated");
      setOpenEdit(false);
    }
    else {
      alert("data updated");
      setOpenEdit(false);
    }
   // window.location.reload(false);
   setRefresh(!refresh);
  }


  //

  //Dilog box  Delete **********************************************************************
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteText, setDeleteText] = React.useState({ sl_no: "", });
  const handleClickOpenDelete = () => {
    console.log(selectedRow);
    setOpenDelete(true);

    let selectedRows = "";
    for (let i = 0; i < selectedRow.length; i++) {
      
      selectedRows = selectedRows + selectedRow[i] + ",";
    }
    deleteText.sl_no = selectedRows;
    console.log(deleteText.sl_no);

  };
  const handelSubmitDelete = async e => {
    console.log(deleteText);
    let res = await axios.get('http://localhost:8080/HRC_Jdbc/delete_data_servelet', { params: { sl_no: deleteText.sl_no } });
    console.log(res);
    setOpenDelete(false);
    window.location.reload(false);
  }

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  //
  React.useEffect(() => {
    loadData();
  }, [refresh])

  async function loadData() {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/HRC_Jdbc/fetchData');
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  }

  const searchField = e => {
    setSearch(e.target.value);
  }


  //Advance Search ***********************************************************************
  const [openAdvanceSearch, setAdvanceSearch] = React.useState(false);
  const [advanceSearchText, setAdvanceSearchText] = React.useState({doc_id: "",
  invoice_id:"",
  cust_number:"",
  buisness_year:"" ,});
  const handleChangeAdvanceSearch = (event) => {
    const name = event.target.name; //cust_num
    const value = event.target.value; 
    setAdvanceSearchText(advanceSearchText => ({ ...advanceSearchText, [name]: value }));

  }

  const handleClickAdvanceSearch = () => {
    setAdvanceSearch(true);
  };

  const handleCloseAdvanceSearch = () => {
    setAdvanceSearch(false);
  };
  const handleAdvanceSearchSubmit = async e => {

    e.preventDefault();
    console.log(advanceSearchText);
    let res = await fetch('http://localhost:8080/HRC_Jdbc/advance_search', {
      method: 'POST',
      body: new URLSearchParams({
        doc_id: advanceSearchText.doc_id,
        invoice_id: advanceSearchText.invoice_id,
        cust_number: advanceSearchText.cust_number,
        buisness_year: advanceSearchText.buisness_year,
      })
  });
  const jsonAdv = await res.json();
      setData(jsonAdv);
      setAdvanceSearch(false);
      
  }

  //Grid Reloading 
  const handleReloading = () => {
    //window.location.reload(false);
    setRefresh(!refresh);

  }



  return (
    < div style={{backgroundColor: "#FFFFFF",height:"100%"}}>
    
      <Header></Header>
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "#FFFFFF" ,overflowX:"hidden"}}>
        <div style={{padding:"10px 30px"}}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button variant="contained" onClick={handleChangePredict} color="secondary">Predict</Button>
          <Button variant="outlined" onClick={handleClickAdvanceSearch} color="secondary">Advance Search</Button>
          <Button variant="outlined" onClick={handleReloading} color="secondary">⟳</Button>
          </ButtonGroup>
          
          <Dialog open={openAdvanceSearch} onClose={handleCloseAdvanceSearch}>
            <DialogTitle  style={{ backgroundColor: '#9c27b0', color: 'white' }}>Advance Search</DialogTitle>
            <DialogContent  style={{ backgroundColor: '#9c27b0', color: 'white' }}>

              <Grid container>
                <Grid item md={6}>
                  <TextField
                  sx={{
                    input: { backgroundColor: 'white', borderRadius: '5px' }}}
                  
                    id="doc_id"
                    label="Document ID"
                    type="text"
                    variant="filled" 
                    style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' ,width:"100"}}
                    name="doc_id"
                    value={advanceSearchText.doc_id}
                    onChange={handleChangeAdvanceSearch}
                    
                  />

                </Grid>
                <Grid item md={6}>
                  <TextField
                    autoFocus
                    sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}}
                 
                    id="invoice_id"
                    label="Invoice ID"
                    type="text"
                    variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' ,width:"100"}}
                    name="invoice_id"
                    value={advanceSearchText.invoice_id}
                    onChange={handleChangeAdvanceSearch}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    autoFocus
                    sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}}
                    
                    id="cust_number"
                    label="Customer Number"
                    type="text"
                    variant="filled"
                     style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' ,width:"100"}}
                    name="cust_number"
                    onChange={handleChangeAdvanceSearch}
                    value={advanceSearchText.cust_number}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}}
                    id="buisness_year"
                    label="Buisness Year"
                    variant="filled" 
                    style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' ,width:"100"}}
                    type="text"
                    
                    onChange={handleChangeAdvanceSearch}
                    name="buisness_year"
                  />
                </Grid>
              </Grid>

            </DialogContent>
            <DialogActions  style={{ backgroundColor: '#9c27b0', color: 'white' }}>
              <Button variant="outlined" style={{ color: 'white', borderColor: 'white', width: '100%' }} onClick={handleCloseAdvanceSearch}>Cancel</Button>
              <Button variant="outlined" style={{ color: 'white', borderColor: 'white', width: '100%' }} onClick={handleAdvanceSearchSubmit}>Search</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div >
        <input type="search" placeholder="Search Customer ID" onChange={searchField} style={{width:"300px",height:"40px",border: '1px solid black',padding:"20px",margin:"10px",marginRight:"40px"}}></input>
         
        </div>
       
        <div style={{padding:"5px 75px"}}>
          <Button style={{maxHeight:"40px",marginTop:"5px"}} variant="outlined" color="secondary" onClick={handleClickOpenAdd} >add</Button>
          <Dialog open={openAdd} onClose={handleCloseAdd} fullWidth
            maxWidth="xl">
            <DialogTitle style={{ backgroundColor: '#9c27b0', color: 'white' }}>Add</DialogTitle>
            <DialogContent style={{ backgroundColor: '#9c27b0', color: 'black' }}>

              <Box sx={{ width: '100%' }}>
                <Grid container>
                  <Grid item md={3}>
                    <TextField name="business_code" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }
                    }} value={addText.business_code} onChange={handleChangeAdd} label="Business Code" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' ,width:"100"}} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="cust_number" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.cust_number} onChange={handleChangeAdd} label="Customer Number" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px' , padding: '10px' }} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="clear_date" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.clear_date} onChange={handleChangeAdd} type='date' label="Clear Date" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' }} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField id="" name="buisness_year" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.buisness_year} onChange={handleChangeAdd} label="Business Year" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' }} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField id="" name="doc_id" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.doc_id} onChange={handleChangeAdd} label="Document id" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' }} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="posting_date" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.posting_date} onChange={handleChangeAdd} type='date' label="Posting Date" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px' , padding: '10px'}} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} name="document_create_date" value={addText.document_create_date} onChange={handleChangeAdd} type='date' label="Document Create Date" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px' , padding: '10px'}} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} name="due_in_date" value={addText.due_in_date} onChange={handleChangeAdd} type='date' label="Due Date" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px'  ,padding: '10px'}} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField id="" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} name="invoice_currency" value={addText.invoice_currency} onChange={handleChangeAdd} label="Invoice Currency" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' }} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="document_type"  sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.document_type} onChange={handleChangeAdd} label="Document Type" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px'}} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="posting_id" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.posting_id} onChange={handleChangeAdd} label="Posting Id" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' }} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="total_open_amount" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}}value={addText.total_open_amount} onChange={handleChangeAdd} label="Total open amount" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px'}} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="baseline_create_date" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.baseline_create_date} onChange={handleChangeAdd} type='date' label="Baseline Create Date" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' }} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="cust_payment_terms" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.cust_payment_terms} onChange={handleChangeAdd} label="Customer Payment Terms" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' }} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="invoice_id" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.invoice_id} onChange={handleChangeAdd} label="Invoice Id" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px' , padding: '10px'}} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="document_create_date1" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.document_create_date1} onChange={handleChangeAdd} type='date' label="document create date 1" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' }} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="area_business" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.area_business} onChange={handleChangeAdd} label="area business" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px' , padding: '10px'}} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="aging_bucket" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.aging_bucket} onChange={handleChangeAdd} label="aging bucket" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' }} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="isOpen" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.isOpen} onChange={handleChangeAdd} label="isOpen" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' }} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="is_deleted" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.is_deleted} onChange={handleChangeAdd} label="Is Deleted" variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' }} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="name_customer" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.name_customer} onChange={handleChangeAdd} label="name Customer " variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px' , padding: '10px'}} />
                  </Grid>
                  <Grid item md={3}>
                    <TextField  name="business_name" sx={{
                      input: { backgroundColor: 'white', borderRadius: '5px' }}} value={addText.business_name} onChange={handleChangeAdd} label="business name " variant="filled" style={{ justifyContent: 'space-around', marginRight: '12px', padding: '10px' }} />
                  </Grid>

                </Grid>
              </Box>
            </DialogContent>
            <DialogActions style={{ backgroundColor: '#9c27b0' }}>
              <Button  variant="outlined" onClick={handleCloseAdd} style={{ color: 'white', borderColor: 'white', width: '100%' }}>Cancel</Button>
              <Button  variant="outlined" onClick={handleSubmitAdd} style={{ color: 'white', borderColor: 'white', width: '100%' }} >ADD</Button>
            </DialogActions>
          </Dialog>


          <Button style={{maxHeight:"40px",marginTop:"5px"}} variant="outlined" color="secondary" disabled={disableEdit} onClick={handleClickOpenEdit} >Edit</Button>
          <Dialog open={openEdit}  onClose={handleCloseEdit} >

            <DialogTitle style={{ backgroundColor: '#9c27b0', color: 'black' }}>Edit</DialogTitle>
            <DialogContent style={{ backgroundColor: '#9c27b0', color: 'black' }}>

              <div style={{ display: 'flex', marginRight: '12px' }}>
                <TextField  sx={{
                  input: { backgroundColor: 'white', borderRadius: '5px' }}} name='invoice_currency' value={editText.invoice_currency} onChange={handleChangeEdit} style={{ justifyContent: 'space-around', marginRight: '12px',padding:"10px" }} label="Invoice Currency" variant="filled" />
                <TextField  sx={{
                  input: { backgroundColor: 'white', borderRadius: '5px' }}} name='cust_payment_terms' value={editText.cust_payment_terms} onChange={handleChangeEdit} style={{ justifyContent: 'space-around', marginRight: '12px',padding:"10px"  }} label="Custtomer Payment Terms" variant="filled" />
              </div>
            </DialogContent>
            <DialogActions style={{ backgroundColor: '#9c27b0', color: 'black' }}>
              <Button variant="outlined" style={{ color: 'white', borderColor: 'white', width: '100%' }} onClick={handleCloseEdit}>Cancel</Button>
              <Button variant="outlined" style={{ color: 'white', borderColor: 'white', width: '100%' }} onClick={handleSubmitEdit}>Edit</Button>
            </DialogActions>
          </Dialog>


          <Button style={{maxHeight:"40px",marginTop:"5px"}} variant="outlined" color="secondary" disabled={disableDelete} onClick={handleClickOpenDelete}>Delete</Button>
          <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle style={{ backgroundColor: '#9c27b0', color: 'black' }}>Delete Records ?</DialogTitle>
            <DialogContent style={{ backgroundColor: '#9c27b0', color: 'black' }}>
              <DialogContentText style={{color: 'black'}}>
                Are You Sure You want to delete These Record[s]?
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ backgroundColor: '#9c27b0', color: 'black' }}>
              <Button  variant="outlined" style={{ color: 'white', borderColor: 'white', width: '100%' }} onClick={handleCloseDelete}>Cancel</Button>
              <Button  variant="outlined" style={{ color: 'white', borderColor: 'white', width: '100%' }} onClick={handelSubmitDelete}>Delete</Button>
            </DialogActions>
          </Dialog>


          </div>
      </div>
      <div style={{ width: '100%' }}>
    <DataGrid sx={{
          '& .MuiTablePagination-root': {
            color: 'black'
          },
        }} style={{
          backgroundColor: '#FFFFFF',
          color: 'black'
        }}
          rows={data.filter((d) => {
            if (search === "") {
              return d;
            }
            else if (d.cust_number.toString().includes(search)) {
              return d;
            }

          })}
          rowHeight={50}
          autoHeight 
          getRowId={(row) => row.sl_no}
          columns={HeadingData}
          onPageChange={(page) => setPage(page)}
          loading={loading}
          pageSize={pageSize}
          onPageSizeChange={(pageSize) => setPageSize(pageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          pagination
          disableSelectionOnClicks
          onSelectionModelChange={(newselection) => {
             newselection.length == 1 ? setEditDisable(false) : setEditDisable(true) 
              newselection.length >= 1 ? setDeleteDisable(false) : setDeleteDisable(true)
            
            setSelectedRow(newselection)
          }}
          selectionModel={selectedRow}
        />
      </div>
      <Footer></Footer>
    </div>
  )
}

