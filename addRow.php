<tr class="table_row">
    <th scope="col">X</th>
    <th scope="col">Y</th>
    <th scope="col">R</th>
    <th scope="col">Время</th>
    <th scope="col">Время исполнения</th>
    <th scope="col">Результат</th>
</tr>

<?php foreach ($_SESSION["client"] as $value){ ?>
    <tr class="table-row">
        <td><?php echo $value[0] ?></td>
        <td><?php echo $value[1] ?></td>
        <td><?php echo $value[2] ?></td>
        <td><?php echo $value[3] ?></td>
        <td><?php echo $value[4] ?> ms</td>
        <?php echo $value[5] ? "<td style='color: green'>Попадение</td>" : "<td style='color: red'>Промах</td>"; ?>
    </tr>
<?php } ?>
