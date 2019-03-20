// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "pm-test-open" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.testOpen', () => {
		// The code you place here will be executed every time your command is executed

		// 開いてるファイルパスを手に入れる
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('success');
			vscode.window.showErrorMessage('editor not found');
			return;
		}
		let rootPath = vscode.workspace.rootPath;
		if (!rootPath) {
			return;
		}

		let uri = editor.document.fileName;
		// 拡張子を調べる
		// if perl なら
		if (uri.match(/\.p(m|l)$/)) {
			let relativePath = uri.substr(rootPath.length + 1);
			let testFilePath = rootPath + "/t/" + relativePath.replace(/\.p(m|l)$/, ".t");
			let testFileUri = vscode.Uri.file(testFilePath);
			// t/ 配下の同じ場所に同じファイル名.t でファイルを開く（もし無いなら新規で作る）
			let success = vscode.commands.executeCommand('vscode.open', testFileUri);
			// Display a message box to the user
			vscode.window.showInformationMessage('success');
		}

		// if go なら
		if (uri.match(/\.go$/)) {
			// 同じ場所のファイル名_test.go で開くor create
			let relativePath = uri.substr(rootPath.length + 1);
			let testFilePath = rootPath + "/" + relativePath.replace(/\.go$/, "._test.go");

			let testFileUri = vscode.Uri.file(testFilePath);
			let success = vscode.commands.executeCommand('vscode.open', testFileUri);
			vscode.window.showInformationMessage('success');
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
