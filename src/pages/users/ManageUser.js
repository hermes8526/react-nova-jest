import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import {
	Avatar as MuiAvatar,
	Box,
	Breadcrumbs as MuiBreadcrumbs,
	Button,
	Checkbox,
	Chip as MuiChip,
	Divider as MuiDivider,
	Grid,
	IconButton,
	Link,
	Paper as MuiPaper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Toolbar,
	Tooltip,
	Typography,
} from "@material-ui/core";

import { green, orange } from "@material-ui/core/colors";

import {
	Add as AddIcon,
	Archive as ArchiveIcon,
	FilterList as FilterListIcon,
	RemoveRedEye as RemoveRedEyeIcon,
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";
import CreateUserDialog from "./CreateUserDialog";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Chip = styled(MuiChip)`
	${spacing};

	background: ${(props) => props.paid && green[500]};
	background: ${(props) => props.sent && orange[700]};
	color: ${(props) => (props.paid || props.sent) && props.theme.palette.common.white};
`;

const Spacer = styled.div`
	flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
	min-width: 150px;
`;

const Avatar = styled(MuiAvatar)`
	background: ${(props) => props.theme.palette.primary.main};
`;

const Customer = styled.div`
	display: flex;
	align-items: center;
`;

function createData(customer, customerEmail, customerAvatar, status, amount, id, date) {
	return { customer, customerEmail, customerAvatar, status, amount, id, date };
}

let rows = [
	createData("Anna Walley", "anna@walley.com", "A", 0, "All Project", "A day ago", "2020-01-02"),
	createData("Doris Fritz", "doris@fritz.com", "D", 1, "Project Mars", "2 day ago", "2020-02-13"),
	createData("Edward Adkins", "edward@adkins.com", "E", 2, "Project Star", "4 day ago", "2020-03-04"),
	createData("Edwin Baker", "edwin@baker.com", "E", 2, "Project Mars", "A day ago", "2020-02-17"),
	createData("Gordon Workman", "gordan@workman.com", "G", 0, "All Project", "2 day ago", "2020-03-28"),
	createData("Jo Avery", "jo@avery.com", "J", 0, "Project Star", "All Project", "2020-01-23"),
	createData("Leigha Hyden", "leigha@hyden.com", "L", 2, "Project Star", "4 day ago", "2020-03-14"),
	createData("Maureen Gagnon", "maureen@gagnon.com", "M", 1, "Project Mars", "A day ago", "2020-02-22"),
	createData("Maxine Thompson", "maxine@thompson.com", "M", 0, "All Project", "5 day ago", "2020-05-31"),
	createData("Shawn Waddell", "shawn@waddell.com", "S", 0, "All Project", "A day ago", "2020-04-25"),
];

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{ id: "status", alignment: "left", label: "Status" },
	{ id: "user_role", alignment: "left", label: "User Role" },
	{ id: "last_active", alignment: "right", label: "Last Active" },
	{ id: "project_access", alignment: "right", label: "Project Access" },
	{ id: "date", alignment: "left", label: "Created Date" },
	{ id: "actions", alignment: "right", label: "Actions" },
];

function EnhancedTableHead(props) {
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ "aria-label": "select all" }}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.alignment}
						padding={headCell.disablePadding ? "none" : "default"}
						sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

let EnhancedTableToolbar = (props) => {
	const { numSelected } = props;

	return (
		<Toolbar>
			<ToolbarTitle>
				{numSelected > 0 ? (
					<Typography color="inherit" variant="subtitle1">
						{numSelected} selected
					</Typography>
				) : (
					<Typography variant="h6" id="tableTitle">
						Users
					</Typography>
				)}
			</ToolbarTitle>
			<Spacer />
			<div>
				{numSelected > 0 ? (
					<Tooltip title="Delete">
						<IconButton aria-label="Delete">
							<ArchiveIcon />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title="Filter list">
						<IconButton aria-label="Filter list">
							<FilterListIcon />
						</IconButton>
					</Tooltip>
				)}
			</div>
		</Toolbar>
	);
};

function EnhancedTable() {
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("customer");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id) => selected.indexOf(id) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div>
			<Paper>
				<EnhancedTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table aria-labelledby="tableTitle" size={"medium"} aria-label="enhanced table">
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.id);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={`${row.id}-${index}`}
											selected={isItemSelected}>
											<TableCell padding="checkbox">
												<Checkbox
													checked={isItemSelected}
													inputProps={{ "aria-labelledby": labelId }}
													onClick={(event) => handleClick(event, row.id)}
												/>
											</TableCell>
											<TableCell component="th" id={labelId} scope="row">
												<Customer>
													<Avatar>{row.customerAvatar}</Avatar>
													<Box ml={3}>
														{row.customer}
														<br />
														{row.customerEmail}
													</Box>
												</Customer>
											</TableCell>
											<TableCell>
												{row.status === 0 && (
													<Chip size="small" mr={1} mb={1} label="Super Admin" sent />
												)}
												{row.status === 1 && <Chip size="small" mr={1} mb={1} label="Admin" />}
												{row.status === 2 && (
													<Chip size="small" mr={1} mb={1} label="Manager" paid />
												)}
											</TableCell>
											<TableCell align="right">{row.id}</TableCell>
											<TableCell align="right">{row.amount}</TableCell>
											<TableCell>{row.date}</TableCell>
											<TableCell align="right">
												<IconButton aria-label="delete">
													<ArchiveIcon />
												</IconButton>
												<IconButton
													aria-label="details"
													component={NavLink}
													to="/invoices/detail">
													<RemoveRedEyeIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={7} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}

function ManageUser() {

	const [modalOpen, setModalOpen] = React.useState(false);

	const onSetModal = () => {
		setModalOpen(!modalOpen);
	};

	const onSaveUser = () => {

	}

	return (
		<React.Fragment>
			<Helmet title="Users" />

			<Grid justify="space-between" container spacing={24}>
				<Grid item>
					<Typography variant="h3" gutterBottom display="inline">
						Users
					</Typography>

					<Breadcrumbs aria-label="Breadcrumb" mt={2}>
						<Link component={NavLink} exact to="/">
							Dashboard
						</Link>
						<Link component={NavLink} exact to="/">
							Users
						</Link>
						<Typography>Manage</Typography>
					</Breadcrumbs>
				</Grid>
				<Grid item>
					<div>
						<Button variant="contained" color="primary" onClick={() => onSetModal()}>
							<AddIcon />
							New Users
						</Button>
					</div>
				</Grid>
			</Grid>

			<Divider my={6} />

			<Grid container spacing={6}>
				<Grid item xs={12}>
					<EnhancedTable />
				</Grid>
			</Grid>
			<CreateUserDialog
				open={modalOpen}
				save={onSaveUser}
				setOpen={setModalOpen}
			/>
		</React.Fragment>
	);
}

export default ManageUser;
