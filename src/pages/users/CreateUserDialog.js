import React from "react";
import styled from "styled-components/macro";
import {
    Button, Checkbox,
    Dialog,
    Avatar,
    DialogActions,
    DialogContent as MuiDialogContent,
    List as MuiList,
    ListItem,
    ListItemSecondaryAction,
    CardHeader as MuiCardHeader,
    Typography as MuiTypography,
    ListItemText,
    RadioGroup,
    Box as MuiBox,
    AccordionSummary as MuiAccordionSummary,
    Accordion as MuiAccordion,
	DialogTitle, FormControlLabel, FormGroup, Radio, TextField
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { grey, cyan } from "@material-ui/core/colors";
import { ExpandMore as MuiExpandMoreIcon } from '@material-ui/icons';
import AccordionDetails from '@material-ui/core/AccordionDetails';

const Typography = styled(MuiTypography)`
        margin-top: 14px;
        & ul {
            padding-left: 15px;
        }
    `;

function CreatStep1 ({user, errors, onChangeName, onChangeEmail}) {

	return (
		<div>
			<TextField
                variant="outlined"
                autoFocus
				margin="dense"
                name="name"
                value={user.name}
				id="role"
				label="User Name"
                placeholder="Placeholder"
                error={!!errors.name}
                helperText={errors.name}
                onChange={onChangeName}
				fullWidth
			/>
            <TextField
                variant="outlined"
                autoFocus
                margin="dense"
                id="name"
                label="Email"
                type="email"
                name="email"
                value={user.email}
                helperText={errors.email}
                error={!!errors.email}
                onChange={onChangeEmail}
                fullWidth
            />
		</div>
	)
}


const List = styled(MuiList)`
        &>li {
            padding-bottom: 15px;
            padding-top: 15px;
            border-bottom: 1px solid ${grey[200]};
            &:last-child {
                border-bottom: 0;
            } 
        }    
    `;

const Box = styled(MuiBox)`
        border-color: ${cyan[400]};
    `;

function CreatStep2 ({onChangeType}) {
    const userTypes = [
        {
            name: 'Super Admin',
            type: 'super_admin',
            access: 'Full account wide access',
            accessList: [
                'Full account wide access',
                'Full account wide access',
                'Fix issue with Full Calendar styling'
            ],
        },
        {
            name: 'Admin',
            type: 'admin',
            access: 'Full project wide access',
            accessList: [
                'Full account wide access',
                'Full account wide access',
                'Fix issue with Full Calendar styling'
            ],
        },
        {
            name: 'Manager',
            type: 'manager',
            access: 'Project/Site wide Read/Write access',
            accessList: [
                'Full account wide access',
                'Full account wide access',
                'Fix issue with Full Calendar styling'
            ],
        },
        {
            name: 'Occupier',
            type: 'occupier',
            access: 'View only access to certain Site/Zones',
            accessList: [
                'Full account wide access',
                'Full account wide access',
                'Fix issue with Full Calendar styling'
            ],
        },
    ];


	return (
		<div>
            <RadioGroup
                name="type"
            >
            <List>
                {userTypes && userTypes.map(userType =>
                <ListItem borderBottom={1}>
                    <ListItemText fontWeight="fontWeightBold">
                        <Box
                            padding={2}
                            display="inline"
                            borderColor="primary.main"
                            borderRadius={20}
                            border={2}
                            fontWeight="fontWeightBold"
                            marginRight={2}
                        >
                            {userType.name}
                        </Box>
                        <Box display="inline" fontWeight="fontWeightBold">
                            {userType.access}
                        </Box>
                        <Typography variant="body1" marginTop={1}>
                            <ul>
                                <li>Add strict mode support</li>
                                <li>Replace helmet with helmet-async</li>
                                <li>Fix issue with Full Calendar styling</li>
                            </ul>
                        </Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <FormControlLabel
                            onChange={onChangeType}
                            label=""
                            value={userType.name}
                            name="type"
                            control={<Radio/>}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                )}
            </List>
            </RadioGroup>
		</div>
	)
}

const CardHeader = styled(MuiCardHeader)`
        padding-left: 0;
    `;


const ExpandMoreIcon = styled(MuiExpandMoreIcon)`
        vertical-align: middle;
    `;

const Accordion = withStyles({
    root: {
        '&:before': {
            display: 'none',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        paddingLeft: 0,
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    content: {
        margin: 0
    }
})(MuiAccordionSummary);

function CreatStep3 ({user}) {

	const [state, setState] = React.useState({
		gilad: true,
		jason: false,
		antoine: false,
	});


    const permissions = [
        {
            name: 'Project ',
            type: 'antoine_llorca',
            sub: [
                {
                    name: 'sub permissions',
                    type: 'sub_permissions',
                },
                {
                    name: 'sub permissions1',
                    type: 'sub_permissions1',
                },
                {
                    name: 'sub permissions2',
                    type: 'sub_permissions2',
                },
            ]
        },
        {
            name: 'Jason Killia',
            type: 'jason_killia Gray'
        },
        {
            name: 'Gilad Gray',
            type: 'gilad_gray'
        },
    ]

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};


	return (
		<div>
            <MuiBox>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe">
                            R
                        </Avatar>
                    }
                    title={user.name}
                    subheader={user.email}
                />
            </MuiBox>
            <MuiBox
                padding={2}
                display="inline"
                borderColor={cyan[300]}
                bgcolor={cyan[100]}
                borderRadius={20}
                border={2}
                fontWeight="fontWeightBold"
                marginRight={2}
            >
                {user.type}
            </MuiBox>
            <MuiBox display="inline" fontWeight="fontWeightBold">
                {user.type}
            </MuiBox>
            <MuiBox
                marginTop={5}
                padding={3}
                border={1}
                borderRight={0}
                borderLeft={0}
                borderColor={grey[200]}
                display="block"
                fontWeight="fontWeightBold"
            >
                <TextField
                    variant="outlined"
                    autoFocus
                    margin="dense"
                    id="search"
                    label="Search fields"
                    placeholder="Search fields"
                    type="text"
                    fullWidth
                />
            </MuiBox>
            <FormGroup>
                {permissions && permissions.map((permission, i) => {
                    return (permission.sub ? <Accordion key={i}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <Box display="flex" width="100%">
                                <Box display="flex" p={1} width="100%">
                                    <Typography variant="body2">
                                        {permission.name}
                                    </Typography>
                                </Box>
                                <Box p={1} flexShrink={0}>
                                    <FormControlLabel
                                        labelPlacement="end"
                                        control={
                                            <Checkbox
                                                onChange={handleChange}
                                                name="gilad"
                                            />
                                        }
                                    />
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display="block" width="100%">
                                {permission.sub && permission.sub.map((sub, index) => {
                                    return (permission.sub.sub ? <Accordion key={index}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-label="Expand"
                                            aria-controls="additional-actions1-content"
                                            id="additional-actions1-header"
                                        >
                                            <Box display="flex" width="100%">
                                                <Box display="flex" p={1} width="100%">
                                                    <Typography variant="body2">
                                                        {sub.name}
                                                    </Typography>
                                                </Box>
                                                <Box p={1} flexShrink={0}>
                                                    <FormControlLabel
                                                        labelPlacement="end"
                                                        control={
                                                            <Checkbox
                                                                onChange={handleChange}
                                                                name="gilad"
                                                            />
                                                        }
                                                    />
                                                </Box>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        </AccordionDetails>
                                    </Accordion> : <Box display="flex" width="100%">
                                        <Box display="flex" p={1} width="100%">
                                            <Typography variant="body2">
                                                {sub.name}
                                            </Typography>
                                        </Box>
                                        <Box p={1} flexShrink={0}>
                                            <FormControlLabel
                                                labelPlacement="end"
                                                control={
                                                    <Checkbox
                                                        onChange={handleChange}
                                                        name={sub.type}
                                                    />
                                                }
                                            />
                                        </Box>
                                    </Box>)
                                })}
                            </Box>
                        </AccordionDetails>
                    </Accordion> :
                        <Box display="flex" width="100%" pl={5} pr={2}>
                            <Box display="flex" width="100%">
                                <Typography variant="body2">
                                    {permission.name}
                                </Typography>
                            </Box>
                            <Box p={1} flexShrink={0}>
                                <FormControlLabel
                                    labelPlacement="end"
                                    control={
                                        <Checkbox
                                            onChange={handleChange}
                                            name={permission.type}
                                        />
                                    }
                                />
                            </Box>
                        </Box>)
                })}
			</FormGroup>
		</div>
	)
}
const DialogContent = styled(MuiDialogContent)`
        & > div {
            min-height: 580px;
            border-bottom: 1px solid ${grey[200]};
            border-top 1px solid ${grey[200]};
        } 
    `;

function CreateUserDialog ({open, setOpen}) {
	const [step, setStep] = React.useState(0);
	const [errors, setErrors] = React.useState({});
	const [user, setUser] = React.useState({
	    name: '',
	    email: '',
        type: ''
	});
	const [title, setTitle] = React.useState('Add new user');

	const steps = [
        {
            title: 'Add new user',
        },
        {
            title: 'Select User Type'
        },
        {
            title: 'Select project access permissions'
        },
    ]

    const validate = (fieldValues = user) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('email' in fieldValues) {
            temp.email = (/\S+@\S+\.\S+/).test(fieldValues.email) ? "" : "Email is not valid."
        }
        setErrors({
            ...temp
        })

        return Object.values(temp).every(field => field === "")
    }

	const setHandleStep = () => {
        setErrors({name: true})
        if (step === 1) {
            if (user.type === "") {
                return false
            }
        }
        if (validate()){
            if ( step !== 2) {
                setTitle(steps[step + 1].title)
                setStep(step + 1)
            }

            if (step === 2) {
                setStep(0)
                setOpen(false)
                setUser({
                    name: '',
                    email: '',
                    type: ''
                })
            }
        }
	};

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
        validate({ ...user, [event.target.name]: event.target.value });
    };

    const handleChangeType = (event) => {
        setUser({ ...user, type: event.target.value });
    };

	return (
		<Dialog
            fullWidth
            maxWidth={'sm'}
            open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">{title}</DialogTitle>
			<DialogContent>
				{ step === 0 && <CreatStep1 errors={errors} user={user} onChangeName={handleChange} onChangeEmail={handleChange}/>}
				{ step === 1 && <CreatStep2 onChangeType={handleChangeType}/>}
				{ step === 2 && <CreatStep3 user={user} />}
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)} color="primary">
					Cancel
				</Button>
				<Button onClick={() => setHandleStep()} color="primary">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default CreateUserDialog;
