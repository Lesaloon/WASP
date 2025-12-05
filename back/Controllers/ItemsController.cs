using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wasp.Backend.DTOs;
using Wasp.Backend.Services;

namespace Wasp.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemsController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetItem(Guid id)
        {
            try
            {
                var item = await _itemService.GetItemByIdAsync(id);
                return Ok(item);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Item not found" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] ItemBaseDto itemDto)
        {
            try
            {
                if (itemDto is WeaponDto weaponDto)
                {
                    var createdWeapon = await _itemService.CreateWeaponAsync(weaponDto);
                    return CreatedAtAction(nameof(GetItem), new { id = createdWeapon.Id }, createdWeapon);
                }
                else if (itemDto is PartDto partDto)
                {
                    var createdPart = await _itemService.CreatePartAsync(partDto);
                    return CreatedAtAction(nameof(GetItem), new { id = createdPart.Id }, createdPart);
                }
                else if (itemDto is AccessoryDto accessoryDto)
                {
                    var createdAccessory = await _itemService.CreateAccessoryAsync(accessoryDto);
                    return CreatedAtAction(nameof(GetItem), new { id = createdAccessory.Id }, createdAccessory);
                }
                else
                {
                    return BadRequest(new { message = "Invalid item type" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateItem(Guid id, [FromBody] ItemBaseDto itemDto)
        {
            try
            {
                if (itemDto is WeaponDto weaponDto)
                {
                    await _itemService.UpdateWeaponAsync(id, weaponDto);
                }
                else if (itemDto is PartDto partDto)
                {
                    await _itemService.UpdatePartAsync(id, partDto);
                }
                else if (itemDto is AccessoryDto accessoryDto)
                {
                    await _itemService.UpdateAccessoryAsync(id, accessoryDto);
                }
                else
                {
                    return BadRequest(new { message = "Invalid item type" });
                }

                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Item not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteItem(Guid id)
        {
            try
            {
                var result = await _itemService.DeleteItemAsync(id);
                if (!result)
                    return NotFound(new { message = "Item not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetItems([FromQuery] ItemFilterDto filter)
        {
            try
            {
                var items = await _itemService.GetItemsAsync(filter);
                return Ok(items);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}