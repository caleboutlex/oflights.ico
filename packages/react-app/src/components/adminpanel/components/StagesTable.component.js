import React from 'react'
import { useWeb3React } from '@web3-react/core';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead,
    TableFooter,
    TablePagination,
    TableRow,
    Paper
} from '@material-ui/core'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { useStyles } from '../adminpanel.styles';
import { formatter } from '../../../utils/utils';


const checkbox = (state) => {
    if(state == 'true') {
        return (
            <CheckBoxIcon/>
        );
    } else if(state === 'false'){
        return(
            <CheckBoxOutlineBlankIcon/>
        );
    } else {
        return (
            <CheckBoxIcon/>
        )
    } 
};


const StagesTabel = () =>{
    const { account, library, chainId } = useWeb3React();
    const contractInfo = 0
    const allstages = 0
    const classes = useStyles();
   

    function createData(name, allocation, limit, rate, active, goalReached, whitelisted) {
        return { name, allocation, limit, rate, active, goalReached, whitelisted };
    }

    const makeRows = () => {
        let _rows =[]; 
        for(let i = 0; i < contractInfo.totalStages; i++){
            _rows.push(createData(
                allstages[i].name, 
                formatter.format(library.utils.fromWei(allstages[i].allocation.toString(), 'ether')), 
                formatter.format(library.utils.fromWei(allstages[i].limit.toString(), 'ether')),
                formatter.format(library.utils.fromWei(allstages[i].rate.toString(), 'ether')), 
                allstages[i].active,
                allstages[i].goalReached,
                allstages[i].whitelisted,
            ));
        };
        return _rows;
    }
    
    const rows = makeRows();

    return (
        <TableContainer component={Paper} className={classes.card}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ICO Sale Stages</TableCell>
                    <TableCell align="right">Allocation</TableCell>
                    <TableCell align="right">Limit&nbsp;(USD)</TableCell>
                    <TableCell align="right">Rate&nbsp;(USD/OFLY)</TableCell>
                    <TableCell align="right">Active</TableCell>
                    <TableCell align="right">Goal Reached</TableCell>
                    <TableCell align="right">Whitelisted</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.allocation}</TableCell>
                    <TableCell align="right">{row.limit}</TableCell>
                    <TableCell align="right">{row.rate}</TableCell>
                    <TableCell align="right">{checkbox(row.active)}</TableCell>
                    <TableCell align="right">{checkbox(row.goalReached)}</TableCell>
                    <TableCell align="right">{checkbox(row.whitelisted)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default StagesTabel;