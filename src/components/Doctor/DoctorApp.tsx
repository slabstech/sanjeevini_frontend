import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import {Button, Typography} from '@mui/material';
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DataGrid, GridColDef, GridToolbarContainer, useGridApiContext}
  from '@mui/x-data-grid';
import {fetchDoctorAppData} from '../../redux/reducer/DoctorDataReducer';
import {RootState, AppDispatch} from '../../redux/store';
import dayjs,{ Dayjs } from 'dayjs';

interface Message {
  id: bigint;
  appointment_day: string;
  appointment_time: string;
  patient_name: string;
  status: string;
  observations: string;
}

const columns: GridColDef<Message>[] = [
  {field: 'id', headerName: 'ID', width: 90},
  {
    field: 'appointment_day',
    headerName: 'Day',
    width: 150,
    editable: false,
  },
  {
    field: 'appointment_time',
    headerName: 'Time',
    width: 150,
    editable: false,
  },
  {
    field: 'patient_name',
    headerName: 'Patient',
    width: 150,
    editable: false,
  },
  {
    field: 'status',
    width: 150,
    headerName: 'Status',
    editable: false,
  },
  {
    field: 'observations',
    headerName: 'Observations',
    width: 150,
    editable: false,
  },
];

/** render
 * @return {return}
 */
function CustomExportButton() {
  const apiRef = useGridApiContext();

  const handleExport = () => {
    apiRef.current.exportDataAsCsv();
  };

  return (
    <Button onClick={handleExport}>
      Download CSV
    </Button>
  );
}

/** render
 * @return {return}
 */
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <CustomExportButton />
    </GridToolbarContainer>
  );
}

const DoctorApp: React.FC = () => {
  const [timerows, setTimerows] = useState<Array<Message>>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const todayDate = new Date().toISOString().slice(0, 10);
  const today = new Date();
  const nextSevenDays = new Date(today.getTime() +
    (7 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
  const doctorId = 10001;

  const doctorDataList = useSelector((state: RootState) =>
    state.doctorDataList.doctorData);

  useEffect(() => {
    dispatch(
      fetchDoctorAppData({
        page: 1,
        appointment_day_after: todayDate,
        appointment_day_before: nextSevenDays,
        doctor_id: doctorId,
        rejectValue: 'Failed to fetch Appointment.',
      })
  );
}, [dispatch, todayDate, nextSevenDays, doctorId]);

  useEffect(() => {
    if (startDate && endDate) {
      const filteredData = doctorDataList.filter((item:any) => {
        const itemDate = dayjs(item.appointment_day);
        return itemDate.isAfter(startDate) && itemDate.isBefore(endDate);
      });
      setTimerows(filteredData);
    } else {
      setTimerows(doctorDataList);
    }
  }, [doctorDataList, startDate, endDate]);

  return (
    <Box sx={{height: '100%'}}>
      <Typography variant="h6" gutterBottom>
        Appointment
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={(newValue) => {
          setStartDate(newValue);
        }}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={(newValue) => {
          setEndDate(newValue);
        }}
      />
    </LocalizationProvider>
    <DataGrid
        rows={timerows}
        columns={columns}
        slots={{
          toolbar: CustomToolbar,
        }}
        slotProps={{
          toolbar: {
            csvOptions: {allColumns: true, fileName: 'gridData'},
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
              page: 0,
            },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DoctorApp;
