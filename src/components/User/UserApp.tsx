import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import {Button, Typography, TextField} from '@mui/material';
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DataGrid, GridColDef, GridToolbarContainer, useGridApiContext}
  from '@mui/x-data-grid';
import {fetchUserData} from '../../redux/reducer/UserDataReducer';
import {RootState} from '../../redux/store';

interface Message {
  id: bigint;
  overpass_day: string;
  aos: string;
  los: string;
  aos_az: string;
  los_az: string;
  duration: string;
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
    field: 'doctor_name',
    headerName: 'Doctor',
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

const UserApp: React.FC = () => {
  const [timerows, setTimerows] = useState<Array<Message>>([]);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const todayDate = new Date().toISOString().slice(0, 10);
  const today = new Date();
  const nextSevenDays = new Date(today.getTime() +
    (7 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
  const noradId = 60476;

  const userDataList = useSelector((state: RootState) =>
    state.userDataList.satnogsData);

  useEffect(() => {
    dispatch(
        fetchUserData({
          page: 1,
          overpass_day_after: todayDate,
          overpass_day_before: nextSevenDays,
          norad_id: noradId,
          rejectValue: 'Failed to fetch satnogs.',
        })
    );
  }, [dispatch, todayDate, nextSevenDays]);

  useEffect(() => {
    if (startDate && endDate) {
      const filteredData = userDataList.filter((item) => {
        const itemDate = new Date(item.overpass_day);
        return itemDate >= startDate && itemDate <= endDate;
      });
      setTimerows(filteredData);
    } else {
      setTimerows(userDataList);
    }
  }, [userDataList, startDate, endDate]);

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
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
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

export default UserApp;
