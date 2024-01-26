$('#request_img').on('click', async() => {
    const file = $('#file')[0].files;
    const formData = new FormData();
    for(const img of file){
        formData.append('file[]', img);
    }
    $.ajax({
        url: '/img_upload',
        dataType: 'json',
        method: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false
    });
})
$('#request_get').on('click', async() => {
    const resposta = await $.ajax({
        url: '/api/get',
        type: 'GET',
        data: {"request" : "request retorno", AMBIENTE : AMBIENTE}
    });
    $('#result_simple').html(JSON.stringify(resposta, null, "\t"));
})
$('#request_post').on('click', async() => {
    const resposta = await $.ajax({
        url: '/api/post',
        type: 'POST',
        data: {"request" : "request retorno", AMBIENTE : AMBIENTE, teste : 'node response'}
    });
    $('#result_simple').html(JSON.stringify(resposta, null, "\t"));
})
$('#request_put').on('click', async() => {
    const resposta = await $.ajax({
        url: '/api/put',
        type: 'PUT',
        data: {"request" : "request retorno", AMBIENTE : AMBIENTE}
    });
    $('#result_simple').html(JSON.stringify(resposta, null, "\t"));
})
$('#request_delete').on('click', async() => {
    const resposta = await $.ajax({
        url: '/api/delete',
        type: 'DELETE',
        data: {"request" : "request retorno", AMBIENTE : AMBIENTE}
    });
    $('#result_simple').html(JSON.stringify(resposta, null, "\t"));
})
$('#request_get_item').on('click', async() => {
    const resposta = await $.ajax({
        url: '/itens',
        type: 'GET'
    });
    $('#result').html(JSON.stringify(resposta, null, "\t"));
})
$('#request_get_item_id').on('click', async() => {
    const id = $('#params_get_id').val();
    if(id == ''){
        return $('#result').html('É preciso de um ID para pesquisa!');
    }
    const resposta = await $.ajax({
        url: '/itens/' + id,
        type: 'GET'
    });
    $('#result').html(JSON.stringify(resposta, null, "\t"));
    $('#params_get_id').val('');
});
$('#request_post_item').on('click', async() => {
    const nome = $('#params_post_nome').val();
    if(nome == ''){
        return $('#result').html('É preciso de um Nome para criar o item!');
    }
    const post = await $.ajax({
        url: '/itens',
        type: 'POST',
        data: {nome : nome}
    });
    const resposta = await $.ajax({
        url: '/itens/' + post.insertId,
        type: 'GET'
    });
    $('#result').html(JSON.stringify(resposta, null, "\t"));
    $('#params_post_nome').val('');
});
$('#request_put_item').on('click', async() => {
    const id = $('#params_put_id').val();
    const nome = $('#params_put_nome').val();
    if(id == '' || nome == ''){
        return $('#result').html('É preciso de um ID e um Nome para alterar o item!');
    }
    await $.ajax({
        url: '/itens/' + id,
        type: 'PUT',
        data: {nome : nome}
    });
    const resposta = await $.ajax({
        url: '/itens/' + id,
        type: 'GET'
    });
    if(resposta.length < 1){
        return $('#result').html('Nenhum item encontrado para alterar!');
    }
    $('#result').html(JSON.stringify(resposta, null, "\t"));
    $('#params_put_id').val('');
    $('#params_put_nome').val('');
});
$('#request_del_item').on('click', async() => {
    const id = $('#params_del_id').val();
    if(id == ''){
        return $('#result').html('É preciso de um ID para deletar o item!');
    }
    const getId = await $.ajax({
        url: '/itens/' + id,
        type: 'GET'
    });
    await $.ajax({
        url: '/itens/' + id,
        type: 'DELETE'
    });
    if(getId.length < 1){
        return $('#result').html('Nenhum item encontrado para deletar!');
    }
    const resposta = await $.ajax({
        url: '/itens',
        type: 'GET'
    });
    $('#result').html(JSON.stringify(resposta, null, "\t"));
    $('#params_del_id').val('');
});
$('#request_server').on('click', (e) => {
    const mensagem = $('#msg').val();
    console.log(mensagem)
    socket.emit('NEWMSG', {id: socket.id, msg : mensagem});
})