import ButtonTableRow from '../../../src/components/buttons/button-table-row.jsx';
import ButtonCommandsList from '../../../src/components/buttons/button-commands-list.jsx';

var assert = chai.assert;
var TestUtils = ReactTestUtils;

describe('ButtonTableRow', function() {
	before(Utils.createAlloyEditor);

	after(Utils.destroyAlloyEditor);

	beforeEach(Utils.beforeEach);

	afterEach(Utils.afterEach);

	it('should render just the menu button when not expanded', function() {
		var buttonTableRow = ReactDOM.render(
			<ButtonTableRow
				toggleDropdown={sinon.stub()}
				editor={this.editor}
				expanded={false}
			/>,
			this.container
		);

		var menuButton = TestUtils.findRenderedDOMComponentWithTag(
			buttonTableRow,
			'button'
		);

		var dropdown = TestUtils.scryRenderedDOMComponentsWithClass(
			buttonTableRow,
			'ae-dropdown'
		);

		assert.ok(menuButton);
		assert.equal(0, dropdown.length);
	});

	it('should show a dropdown with the action buttons when expanded', function() {
		var buttonTableRow = ReactDOM.render(
			<ButtonTableRow
				toggleDropdown={sinon.stub()}
				editor={this.editor}
				expanded={true}
			/>,
			this.container
		);

		var dropdown = TestUtils.findAllInRenderedTree(buttonTableRow, function(
			component
		) {
			return TestUtils.isCompositeComponentWithType(
				component,
				ButtonCommandsList
			);
		});

		assert.ok(dropdown);
		assert.equal(1, dropdown.length);

		var actionButtons = TestUtils.scryRenderedDOMComponentsWithTag(
			dropdown[0],
			'button'
		);

		assert.ok(actionButtons.length);
	});

	it('should insert a row before the current one when clicking on the rowInsertBefore button', function() {
		var initialFixture = '3_by_3_table.html';
		var expectedFixture = '4_by_3_table_second_row_empty.html';
		var buttonDropdown = ReactDOM.render(
			<ButtonTableRow
				toggleDropdown={sinon.stub()}
				editor={this.editor}
				expanded={true}
			/>,
			this.container
		);
		var buttonCommand = 'rowInsertBefore';

		Utils.assertDropdownCommandButtonResult.call(this, {
			buttonCommand: buttonCommand,
			buttonDropdown: buttonDropdown,
			expectedFixture: expectedFixture,
			initialFixture: initialFixture,
			buttonCommandsList: ButtonCommandsList,
		});
	});

	it('should insert a row after the current one when clicking on the rowInsertAfter button', function() {
		var initialFixture = '3_by_3_table.html';
		var expectedFixture = '4_by_3_table_third_row_empty.html';
		var buttonDropdown = ReactDOM.render(
			<ButtonTableRow
				toggleDropdown={sinon.stub()}
				editor={this.editor}
				expanded={true}
			/>,
			this.container
		);
		var buttonCommand = 'rowInsertAfter';

		Utils.assertDropdownCommandButtonResult.call(this, {
			buttonCommand: buttonCommand,
			buttonDropdown: buttonDropdown,
			expectedFixture: expectedFixture,
			initialFixture: initialFixture,
			buttonCommandsList: ButtonCommandsList,
		});
	});

	it('should delete the current row when clicking on the rowDelete button', function() {
		var initialFixture = '3_by_3_table.html';
		var expectedFixture = '2_by_3_table.html';
		var buttonDropdown = ReactDOM.render(
			<ButtonTableRow
				toggleDropdown={sinon.stub()}
				editor={this.editor}
				expanded={true}
			/>,
			this.container
		);
		var buttonCommand = 'rowDelete';

		Utils.assertDropdownCommandButtonResult.call(this, {
			buttonCommand: buttonCommand,
			buttonDropdown: buttonDropdown,
			expectedFixture: expectedFixture,
			initialFixture: initialFixture,
			buttonCommandsList: ButtonCommandsList,
		});
	});
});
