import { RdsIcon } from "raaghu-react-elements";
import React, { useEffect, useState } from "react";
import RdsCompDatatable from "../rds-comp-data-table/rds-comp-data-table";
import { RdsButton, RdsCheckbox, RdsDropdownList, RdsInput, RdsLabel, RdsSelectList, RdsTextArea } from "../rds-elements";

export interface RdsCompFormsQuestionProps {
	formQuestionsData?: any;
	questionNumber : number
	questionId: any;
	 handleNewQuestionsData?:any;

}

const RdsCompFormsQuestion = (props: RdsCompFormsQuestionProps) => {

	const [formQuestions, setFormQuestions] = useState(props.formQuestionsData);
	function setDescription(value: any) {
		setFormQuestions({ ...formQuestions, description: value })
		props.handleNewQuestionsData({ ...formQuestions, description: value });

	}
	function setTitle(value: any) {
		setFormQuestions({ ...formQuestions, title: value })
		props.handleNewQuestionsData({ ...formQuestions, title: value });

	}
	function setSelectedOption(value: any) {
		setFormQuestions({ ...formQuestions, questionType: value })
		props.handleNewQuestionsData({ ...formQuestions, questionType: value });

	}
	function setOption(index: number, value: any) {
		const tempChoices = [...choices];
		tempChoices[index].value = value;
		setchoices(tempChoices);
	}
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	};

	function handleDelete(el: number) {

		let tempChoices = choices.filter((e: any, i: any) => {
			return el !== i;
		});
		setchoices(tempChoices);
	}

	const [choices, setchoices] = useState<any>([{ value: 'Option' }]);
	const questionsTypeList = [
		{ option: "Short answer", value: 1 },
		{ option: "multiple choice", value: 2 },
		{ option: "checkboxes", value: 3 },
		{ option: "dropdown", value: 4 }]
	function handleAddMoreChoices() {
		
		let tempChoices = choices.map((e: any) => {
			return e;
		})
		tempChoices.push({ value: "Option" })
		setchoices(tempChoices);
	}
	useEffect(() => {
		setFormQuestions(props.formQuestionsData)
	}, [props.formQuestionsData])
	useEffect(() => {
		setFormQuestions({ ...formQuestions, choices })
	}, [choices])
	return (
		<>
		<div  key={props.questionId}>

		
			<h5>Question {props.questionNumber}</h5>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-3">
						<RdsInput
							label="Title"
							placeholder="Enter title"
							inputType="text"
							onChange={(e: any) => setTitle(e.target.value)}
							value={formQuestions.title}
							name={"title"}
						></RdsInput>
					</div>
					<div className="col-3">
						<RdsLabel label="Type" class="pb-2" />
						<RdsSelectList
							label={"Type"}
							selectItems={questionsTypeList}
							selectedValue={formQuestions.questionType}
							onSelectListChange={setSelectedOption}
						></RdsSelectList>
					</div>
					<div className="col-6">
						<RdsTextArea
							label="Description"
							placeholder="Enter description"
							onChange={e => setDescription(e.target.value)}
							value={formQuestions.description}
							rows={1}
						/>
					</div>
				</div>
				<div className="row ">
					{choices.length && choices.map((element: any, i: number) => (<>
						<div className="col-5 py-2 ">
							<RdsInput
								label="Option"
								placeholder="Option"
								inputType="text"
								onChange={(e: any) => setOption(i, e.target.value)}
								value={element.value}
								name={"option"}
							></RdsInput>
						
						</div>
						<div className="col-1 pt-4 align-items-center d-flex">
							{choices.length > 1 && (
								<RdsIcon
									width="17px"
									height="17px"
									name="delete"
									stroke={true}
									colorVariant="danger"
									onClick={() => handleDelete(i)}
								></RdsIcon>
							)}
						</div>
					</>
					))}
					<div className="col-6 d-flex align-items-center">
						<div className="d-flex align-items-center">
							<div >
								<RdsIcon
									width="17px"
									height="17px"
									name="plus"
									stroke={true}
								></RdsIcon>
							</div>
							<span
								className=""
								onClick={handleAddMoreChoices}
							>
								Add More
							</span>
						</div>

					</div>
				</div>
			</form>
			</div>
		</>
	);
};
export default RdsCompFormsQuestion;
